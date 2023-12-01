package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.BookDto;

import java.util.Optional;

public interface BookCrudRepository {

    BookDto save(BookDto bookDto);

    Optional<BookDto> getBook(Long idBook);

}
