package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
