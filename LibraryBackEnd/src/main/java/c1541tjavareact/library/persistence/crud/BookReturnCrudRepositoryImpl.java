package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.domain.repository.BookReturnCrudRepository;
import c1541tjavareact.library.domain.repository.BookReturnRepository;
import c1541tjavareact.library.persistence.entity.BookReturn;
import c1541tjavareact.library.persistence.mapper.BookReturnDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class BookReturnCrudRepositoryImpl implements BookReturnCrudRepository {

    @Autowired
    private BookReturnRepository bookReturnRepository;

    @Autowired
    private BookReturnDaoMapper bookReturnDaoMapper;

    @Override
    public BookReturnDto save(BookReturnDto bookReturnDto) {
        BookReturn bookReturn = bookReturnDaoMapper.toBookReturn(bookReturnDto);
        return bookReturnDaoMapper.toBookReturnDto(bookReturnRepository.save(bookReturn));
    }

    @Override
    public Optional<BookReturnDto> getBookReturn(Long idBookReturn) {
//        bookReturnRepository.findById(idBookReturn)
        bookReturnRepository.findById(idBookReturn);
        return bookReturnRepository.findById(idBookReturn).map(
                bookReturn -> bookReturnDaoMapper.toBookReturnDto(bookReturn)
        );
    }
}
