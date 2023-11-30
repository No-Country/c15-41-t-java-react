package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public interface AuthorRepository extends JpaRepository<Author,Long> {
}
