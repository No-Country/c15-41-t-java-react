/*package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.domain.repository.BookReturnCrudRepository;
import c1541tjavareact.library.domain.repository.BookReturnRepository;
import c1541tjavareact.library.persistence.entity.BookReturn;
import c1541tjavareact.library.persistence.mapper.BookReturnDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookReturnCrudRepositoryImpl implements BookReturnCrudRepository {

    @Autowired
    private BookReturnRepository bookReturnRepository;

    @Autowired
    private BookReturnDaoMapper bookReturnDaoMapper;

    @Override
    public List<BookReturnDto> getAll() {
        List<BookReturn> bookReturns = bookReturnRepository.findAll();
        return bookReturnDaoMapper.toBookReturnsDto(bookReturns);
    }

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

    @Override
    public BookReturnDto update(Long idBookReturn, BookReturnDto bookReturnDto) {
        Optional<BookReturnDto> optBookReturn = getBookReturn(idBookReturn);
        if(optBookReturn.isPresent()){
            BookReturnDto bookReturnToUpdate = optBookReturn.get();
            bookReturnToUpdate.setReturnExpectedDate(bookReturnDto.getReturnExpectedDate());
            bookReturnToUpdate.setStatus(bookReturnDto.getStatus());
            bookReturnToUpdate.setReturnDate(bookReturnDto.getReturnDate());
            return this.save(bookReturnToUpdate);
        }
        return null;
    }

    @Override
    public Boolean delete(Long idBookReturn) {
        Optional<BookReturnDto> optBookReturn = getBookReturn(idBookReturn);
        if(optBookReturn.isPresent()){
            bookReturnRepository.deleteById(idBookReturn);
            return true;
        }
        return false;
    }
}
*/