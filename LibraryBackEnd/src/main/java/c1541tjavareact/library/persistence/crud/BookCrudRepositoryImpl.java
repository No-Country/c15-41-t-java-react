package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.domain.repository.BookRepository;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookCrudRepositoryImpl implements BookCrudRepository {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDaoMapper bookDaoMapper;


    @Override
    public List<BookDto> getAll() {
        List<Book> books = bookRepository.findAll();
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto save(BookDto bookDto) {
        Book book = bookDaoMapper.toBook(bookDto);
        return bookDaoMapper.toBookDto(bookRepository.save(book));
    }

    @Override
    public Optional<BookDto> getBook(Long idBook) {
        return bookRepository.findById(idBook).map(Book -> bookDaoMapper.toBookDto(Book));
    }

    @Override
    public List<BookDto> searchBooksBytitleGenreAuthor(String titleGenreAuthor){
        List<Book> books = bookRepository.searchBooksBytitleGenreAuthor(titleGenreAuthor);
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto update(Long idBook, BookDto bookDto) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){
            BookDto bookToUpdate = optBook.get();
            bookToUpdate.setTitle(bookDto.getTitle());
            bookToUpdate.setIdAuthor(bookDto.getIdAuthor());
            bookToUpdate.setIdEditorial(bookDto.getIdEditorial());
            bookToUpdate.setIsbn(bookDto.getIsbn());
            bookToUpdate.setGenre(bookDto.getGenre());
            bookToUpdate.setQuantity(bookDto.getQuantity());
            return this.save(bookToUpdate);
        }
        return null;
    }

    @Override
    public boolean delete(Long idBook) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){
            bookRepository.deleteById(idBook);
            return true;
        }
        return false;

    }

}
