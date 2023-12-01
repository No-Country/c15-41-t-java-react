package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AuthorRepository extends JpaRepository<Author,Long> {
}
