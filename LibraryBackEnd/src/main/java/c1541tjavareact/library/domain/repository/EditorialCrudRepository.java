package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.EditorialDto;

import java.util.List;
import java.util.Optional;

public interface EditorialCrudRepository {

    List<EditorialDto> getAll();
    EditorialDto save(EditorialDto editorialDto);
    Optional<EditorialDto> getEditorialDto(Long idEditorial);
    EditorialDto update(Long idEditorial, EditorialDto editorialDto);
    void delete(Long idEditorial);

}
