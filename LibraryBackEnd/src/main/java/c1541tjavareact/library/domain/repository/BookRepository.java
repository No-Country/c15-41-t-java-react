package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 *
 */
public interface BookRepository extends JpaRepository<Book,Long> {

    Optional<Book> findByIsbn(String isbn);

    Optional<List<Book>> findByTitle(String title);
//    NameEditorialOrderByNameAsc(String name);

}
