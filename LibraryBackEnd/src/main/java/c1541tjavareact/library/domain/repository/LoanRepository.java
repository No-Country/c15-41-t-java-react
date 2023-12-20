package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByIdBook(Long idBook);
}
