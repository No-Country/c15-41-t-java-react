package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.dto.PendingDto;
import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.repository.LoanCrudRepository;
import c1541tjavareact.library.domain.repository.LoanRepository;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Loan;
import c1541tjavareact.library.persistence.mapper.LoanDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class LoanCrudRepositoryImpl implements LoanCrudRepository {

    @Autowired
    private BookCrudRepositoryImpl bookCrudRepository;
    
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private LoanDaoMapper loanDaoMapper;

    @Autowired
    private PendingCrudRepositoryImpl pendingCrudRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public List<LoanDto> getAll() {
        List<Loan> loans = loanRepository.findAll();
        loans = loans.stream().filter(l -> l.getReturnEffectiveDate()==null).toList();
        return loanDaoMapper.toLoansDto(loans);
    }

    @Override
    public LoanDto save(LoanDto loanDto) {

        Loan loan = loanDaoMapper.toLoan(loanDto);

        Optional<BookDto> bookDto = bookCrudRepository.getBook(loanDto.getIdBook());

        if(bookDto.isPresent()){

            if(bookDto.get().getQuantity() > 1){
                bookDto.get().setQuantity(bookDto.get().getQuantity() - 1);
                bookCrudRepository.save(bookDto.get());

                loan.setLoanDate(LocalDate.now());
                Loan loanSaved = loanRepository.save(loan);

                //Save Pending
                PendingDto pendingToSave = new PendingDto();
                pendingToSave.setIdLoan(loanSaved.getIdLoan());
                pendingToSave.setLocalPendingDate(LocalDate.now());
                pendingToSave.setStatus(Boolean.TRUE);
                pendingToSave.setMessage("""
                        Libro %S se tiene regresar el dia: %S
                        """.formatted(bookDto.get().getTitle(),
                        loanDto.getReturnExpectedDate().toString()));
                pendingCrudRepository.save(pendingToSave);

                return loanDaoMapper.toLoanDto(loanSaved);
            } else {

                throw new BibliotechException("No hay suficientes libros, para realizar un prestamo");

            }

        }

        return null;
    }

    @Override
    public Optional<LoanDto> getLoan(Long idLoan) {
        return loanRepository.findById(idLoan)
                             .map(l -> loanDaoMapper.toLoanDto(l));
    }

    @Override
    public LoanDto update(Long idLoan, LoanDto loanDto) {
        Optional<LoanDto> optLoan = this.getLoan(idLoan);
        if(optLoan.isPresent()){
            LoanDto loanToUpdate = optLoan.get();
//            loanToUpdate.setLoanDate(loanDto.getLoanDate());
            loanToUpdate.setReturnExpectedDate(loanDto.getReturnExpectedDate());
//            loanToUpdate.setReturnEffectiveDate(loanDto.getReturnEffectiveDate());
            loanToUpdate.setIdBook(loanDto.getIdBook());
            loanToUpdate.setIdAdmin(loanDto.getIdAdmin());
            loanToUpdate.setIdUser(loanDto.getIdUser());

            Loan loan = loanDaoMapper.toLoan(loanToUpdate);
            return loanDaoMapper.toLoanDto(loanRepository.save(loan));
        }
        return null;
    }

    @Override
    public boolean delete(Long idLoan) {
        Optional<LoanDto> optLoan = this.getLoan(idLoan);
        if(optLoan.isPresent()){
            loanRepository.deleteById(idLoan);
            return true;
        }
        return false;
    }

    @Override
    public LoanDto returnBookLoan(Long idLoan) {
        Optional<LoanDto> optLoan = this.getLoan(idLoan);
        if(optLoan.isPresent()){
            LoanDto loanToUpdate = optLoan.get();
            loanToUpdate.setReturnEffectiveDate(LocalDate.now());

            //Cambio Status Pending a False
            Optional<PendingDto> optPending = pendingCrudRepository.findByIdLoan(idLoan);
            if(optPending.isPresent()) {
                PendingDto pendingDto = optPending.get();
                BookDto bookDto = loanToUpdate.getBookDto();
                bookDto.setQuantity(bookDto.getQuantity() + 1);
                bookCrudRepository.save(bookDto);

                pendingDto.setStatus(Boolean.FALSE);
                pendingCrudRepository.save(pendingDto);
                //loanToUpdate.setPendingDto(null);
                Loan loan = loanDaoMapper.toLoan(loanToUpdate);
                return loanDaoMapper.toLoanDto(loanRepository.save(loan));
            }
        }
        return null;
    }

    @Override
    public void sendMail(Long idLoan) {
        Optional<LoanDto> optLoanDto = this.getLoan(idLoan);
        if(optLoanDto.isPresent()) {
            LoanDto loanDto = optLoanDto.get();
            this.sendTaskMail(loanDto);
        }
    }

    //Funcion envio email
    public void sendTaskMail(LoanDto loanDto){
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            UserDto userDto = loanDto.getUserDto();

            simpleMailMessage.setTo(userDto.getEmail());
            simpleMailMessage.setFrom(loanDto.getAdminDto().getEmail());
            simpleMailMessage.setSubject("Recordatorio devolucion de libro ");
            simpleMailMessage.setText("""
                    Hola %s %s,
                                        
                    La devolucion del libro %s es el dia %s.
                                        
                    Gracias,
                                        
                    %s %s
                    Grupo Bibliotech
                    """
                    .formatted(userDto.getName(), userDto.getLastName(),
                            loanDto.getBookDto().getTitle(),
                            loanDto.getReturnExpectedDate(),
                            loanDto.getAdminDto().getName(), loanDto.getAdminDto().getLastName()
                    )
            );

            javaMailSender.send(simpleMailMessage);
        }catch (MailException e) {
            throw new BibliotechException("Error durante el envio de un email");
        }
    }

}
