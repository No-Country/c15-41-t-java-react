package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AuthorDto;

import java.util.List;
import java.util.Optional;


public interface AuthorCrudRepository {
    List<AuthorDto> getAll();
    AuthorDto save(AuthorDto authorDto);
    Optional<AuthorDto> getAuthorDto(Long idAuthor);
    AuthorDto update(Long idAuthor, AuthorDto authorDto);
    void delete(Long idAuthor);
}
