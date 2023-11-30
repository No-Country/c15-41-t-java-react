package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.AuthorCrudRepository;
import c1541tjavareact.library.domain.repository.BookCrudRepository;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Service
public class AuthorService {
    @Autowired
    private AuthorCrudRepository authorCrudRepository;
    public AuthorDto save(AuthorDto authorDto) {
        return authorCrudRepository.save(authorDto);
    }

}
