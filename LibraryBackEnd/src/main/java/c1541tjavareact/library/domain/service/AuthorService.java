package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.AuthorCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
    @Autowired
    private AuthorCrudRepository authorCrudRepository;
    public AuthorDto save(AuthorDto authorDto) {
        return authorCrudRepository.save(authorDto);
    }

}
