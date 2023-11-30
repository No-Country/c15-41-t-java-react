package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public interface EditorialRepository extends JpaRepository<Editorial,Long> {
}
