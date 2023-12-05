package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.domain.repository.BookReturnCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookReturnService {
    @Autowired
    private BookReturnCrudRepository bookReturnCrudRepository;

    public BookReturnDto save(BookReturnDto bookReturnDto) {
        return bookReturnCrudRepository.save(bookReturnDto);
    }

    public Optional<BookReturnDto> getBookReturn(Long idBookReturn) {
        return bookReturnCrudRepository.getBookReturn(idBookReturn);
    }
}
