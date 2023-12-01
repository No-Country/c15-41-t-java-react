package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookCrudRepository bookCrudRepository;

    public BookDto save(BookDto bookDto) {
        return bookCrudRepository.save(bookDto);
    }

    public Optional<BookDto> getBook(Long idBook) {
        return bookCrudRepository.getBook(idBook);
    }


}
