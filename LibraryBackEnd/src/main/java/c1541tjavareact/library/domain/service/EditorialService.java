package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.repository.EditorialCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EditorialService {

    @Autowired
    private EditorialCrudRepository editorialCrudRepository;

    public List<EditorialDto> getAll() {
        return editorialCrudRepository.getAll();
    }

    public EditorialDto save(EditorialDto editorialDto) {
        return editorialCrudRepository.save(editorialDto);
    }

    public Optional<EditorialDto> getEditorialDto(Long idEditorial) {
        return editorialCrudRepository.getEditorialDto(idEditorial);
    }

    public EditorialDto update(Long idEditorial, EditorialDto editorialDto) {
        return editorialCrudRepository.update(idEditorial,editorialDto);
    }

    public void delete(Long idEditorial) {
        editorialCrudRepository.delete(idEditorial);
    }

}
