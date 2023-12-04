package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.AuthorCrudRepository;
import c1541tjavareact.library.persistence.entity.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {
    @Autowired
    private AuthorCrudRepository authorCrudRepository;

    public List<AuthorDto> getAll() {
        return authorCrudRepository.getAll();
    }

    public AuthorDto save(AuthorDto authorDto) {
        return authorCrudRepository.save(authorDto);
    }

    public Optional<AuthorDto> getAuthorDto(Long idAuthor) {
        return authorCrudRepository.getAuthorDto(idAuthor);
    }

    public AuthorDto update(Long idAuthor, AuthorDto authorDto) {
        return authorCrudRepository.update(idAuthor,authorDto);
    }

    public void delete(Long idAuthor) {
        authorCrudRepository.delete(idAuthor);
    }

}
