package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.persistence.entity.Author;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
public interface AuthorCrudRepository {
    AuthorDto save(AuthorDto authorDto);
}
