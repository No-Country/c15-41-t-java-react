package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.domain.repository.BookRepository;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.entity.Loan;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Repository
public class BookCrudRepositoryImpl implements BookCrudRepository {

    @Autowired
    private BookRepository bookRepository;

//    @Autowired
//    private BookDaoMapper bookDaoMapper;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn);
    }

    @Override
    public Optional<List<Book>> getBookByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book update(Long idBook, Book book) {
        return bookRepository.findById(idBook).map(
                book1 -> {
                    book1.setTitle(book.getTitle());
                    book1.setIsbn(book.getIsbn());
                    book1.setGenre(book.getGenre());
                    book1.setQuantity(book.getQuantity());
                    book1.setAuthor(book.getAuthor());
                    book1.setEditorialList(book.getEditorialList());
                    return bookRepository.save(book1);
                }
        ).orElseThrow(() -> new RuntimeException("Id not found"));
    }

    @Override
    public void delete(Long idBook) {
        bookRepository.deleteById(idBook);
    }
}
