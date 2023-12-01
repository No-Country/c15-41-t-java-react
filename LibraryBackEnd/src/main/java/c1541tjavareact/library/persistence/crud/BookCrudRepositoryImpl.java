package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.domain.repository.BookRepository;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class BookCrudRepositoryImpl implements BookCrudRepository {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDaoMapper bookDaoMapper;


    @Override
    public BookDto save(BookDto bookDto) {

        Book book = bookDaoMapper.toBook(bookDto);
        return bookDaoMapper.toBookDto(bookRepository.save(book));
    }

    @Override
    public Optional<BookDto> getBook(Long idBook) {
        return bookRepository.findById(idBook).map(Book -> bookDaoMapper.toBookDto(Book));
    }
}
