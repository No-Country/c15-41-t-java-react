package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Pending;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PendingRepository extends JpaRepository<Pending, Long> {

    Optional<Pending> findByIdLoan(Long idLoan);
}
