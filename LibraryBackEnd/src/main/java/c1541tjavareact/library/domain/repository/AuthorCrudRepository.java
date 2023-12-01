package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.persistence.entity.Author;


public interface AuthorCrudRepository {
    AuthorDto save(AuthorDto authorDto);
}
