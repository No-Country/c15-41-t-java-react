package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.entity.enums.Genre;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public interface BookCrudRepository {

    List<Book> getAllBooks();
    Optional<Book> getBookByIsbn(String isbn);
    Optional<List<Book>> getBookByTitle(String title);
    Book save(Book book);
    Book update(Long idBook,Book book);
    void delete(Long idBook);

    Optional<AuthorDto> getAuthor(Long idAuthor);

    Optional<Editorial> getEditorial(Long idEditorial);
//    Optional<Book> getBookByGenre(String genre); TODO

}
