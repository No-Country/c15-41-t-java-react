package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
