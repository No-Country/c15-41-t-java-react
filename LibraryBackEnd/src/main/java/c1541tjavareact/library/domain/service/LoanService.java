package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.repository.LoanCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanCrudRepository loanCrudRepository;
    public List<LoanDto> getAll(){
        return loanCrudRepository.getAll();
    }
    public LoanDto save(LoanDto loanDto){
        return loanCrudRepository.save(loanDto);
    }

    public Optional<LoanDto> getLoan(Long idLoan){
        return loanCrudRepository.getLoan(idLoan);
    }

    public LoanDto update(Long idLoan, LoanDto loanDto){
        return loanCrudRepository.update(idLoan, loanDto);
    }
    public boolean delete(Long idLoan){
        return loanCrudRepository.delete(idLoan);
    }

    public LoanDto returnBookLoan(Long idLoan) {
        return loanCrudRepository.returnBookLoan(idLoan);
    }
}
