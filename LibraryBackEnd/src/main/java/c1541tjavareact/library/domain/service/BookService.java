package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.mapper.AuthorDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Service
public class BookService {

    @Autowired
    private BookCrudRepository bookCrudRepository;

    @Autowired
    private AuthorDaoMapper authorDaoMapper;

    public List<Book> getAllBooks() {
        return bookCrudRepository.getAllBooks();
    }

    public Optional<Book> getBookByIsbn(String isbn) {
        return bookCrudRepository.getBookByIsbn(isbn);
    }

    public Optional<List<Book>> getBookByTitle(String title) {
        return bookCrudRepository.getBookByTitle(title);
    }

    public Book save(Book book) {
        return bookCrudRepository.save(book);
    }

    public Book update(Long idBook, Book book) {
        return bookCrudRepository.update(idBook,book);
    }

    public void delete(Long idBook) {
        bookCrudRepository.delete(idBook);
    }

    public AuthorDto getAuthor(Long idAuthorDto){
        //return bookCrudRepository.getAuthor(idAuthor).orElseThrow();
//        Author author = authorDaoMapper.toAuthor(bookCrudRepository.getAuthor(idAuthorDto));
        Optional<AuthorDto> authorDto = bookCrudRepository.getAuthor(idAuthorDto);
        if (authorDto.isEmpty()){
            throw new RuntimeException("Author not found");
        }
        return bookCrudRepository.getAuthor(idAuthorDto).get();
    }

    public Editorial getEditorial(Long idEditorial) {
        return bookCrudRepository.getEditorial(idEditorial).orElseThrow();
    }
}
