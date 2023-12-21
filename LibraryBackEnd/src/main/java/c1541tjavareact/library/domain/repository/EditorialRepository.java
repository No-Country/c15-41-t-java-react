package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EditorialRepository extends JpaRepository<Editorial, Long> {
    Optional<Editorial> findByName(String name);
}
