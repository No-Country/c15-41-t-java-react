package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface BookCrudRepository {

    List<BookDto> getAll();
    BookDto save(BookDto bookDto);

    Optional<BookDto> getBook(Long idBook);

    List<BookDto> searchBooksBytitleGenreAuthor(String titleGenreAuthor);
    BookDto update(Long idBook, BookDto bookDto);
    boolean delete(Long idBook);
}
