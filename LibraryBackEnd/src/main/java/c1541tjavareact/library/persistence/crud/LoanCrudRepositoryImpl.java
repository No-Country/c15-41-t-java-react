package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.repository.LoanCrudRepository;
import c1541tjavareact.library.domain.repository.LoanRepository;
import c1541tjavareact.library.persistence.entity.Loan;
import c1541tjavareact.library.persistence.mapper.LoanDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LoanCrudRepositoryImpl implements LoanCrudRepository {
    
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private LoanDaoMapper loanDaoMapper;

    @Override
    public List<LoanDto> getAll() {
        List<Loan> loans = loanRepository.findAll();
        return loanDaoMapper.toLoansDto(loans);
    }

    @Override
    public LoanDto save(LoanDto loanDto) {
        Loan loan = loanDaoMapper.toLoan(loanDto);
        return loanDaoMapper.toLoanDto(loanRepository.save(loan));
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
            loanToUpdate.setLoanDate(loanDto.getLoanDate());
            loanToUpdate.setReturnExpectedDate(loanDto.getReturnExpectedDate());
            //loanToUpdate.setReturnExpectedDate(loanToUpdate.getLoanDate().plusMonths(1));
            loanToUpdate.setIdBook(loanDto.getIdBook());
            loanToUpdate.setIdAdmin(loanDto.getIdAdmin());
            loanToUpdate.setIdUser(loanDto.getIdUser());
            return this.save(loanToUpdate);
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
}