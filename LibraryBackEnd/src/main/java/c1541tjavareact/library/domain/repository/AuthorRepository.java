package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface AuthorRepository extends JpaRepository<Author,Long> {
    List<Author> findByName(String name);
    List<Author> findByLastName(String astName);

}
