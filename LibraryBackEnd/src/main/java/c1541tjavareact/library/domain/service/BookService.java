package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookCrudRepository bookCrudRepository;

    public List<BookDto> getAll(){
        return bookCrudRepository.getAll();
    }
    public BookDto save(BookDto bookDto) {
        return bookCrudRepository.save(bookDto);
    }

    public Optional<BookDto> getBook(Long idBook) {
        return bookCrudRepository.getBook(idBook);
    }
    public List<BookDto> searchBooksBytitleGenreAuthor(String titleGenreAuthor){
        return bookCrudRepository.searchBooksBytitleGenreAuthor(titleGenreAuthor);
    }
    public BookDto update(Long idBook, BookDto bookDto){
        return bookCrudRepository.update(idBook, bookDto);
    }
    public boolean delete(Long idBook){
        return bookCrudRepository.delete(idBook);
    }

    public List<String> getBookGenres() {
        return Arrays.stream(Genre.values())
                        .map(Genre::getValue)
                        .toList();
    }
}
