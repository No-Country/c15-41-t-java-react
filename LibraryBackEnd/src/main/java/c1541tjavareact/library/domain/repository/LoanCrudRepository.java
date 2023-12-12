package c1541tjavareact.library.domain.repository;



import c1541tjavareact.library.domain.dto.LoanDto;

import java.util.List;
import java.util.Optional;

public interface LoanCrudRepository {

    List<LoanDto> getAll();
    LoanDto save(LoanDto loanDto);

    Optional<LoanDto> getLoan(Long idLoan);

    LoanDto update(Long idLoan, LoanDto loanDto);
    boolean delete(Long idLoan);

    LoanDto returnBookLoan(Long idLoan);
}
