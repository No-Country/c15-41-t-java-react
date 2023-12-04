package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.repository.EditorialCrudRepository;
import c1541tjavareact.library.domain.repository.EditorialRepository;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.mapper.EditorialDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EditorialCrudRepositoryImpl implements EditorialCrudRepository {

    @Autowired
    private EditorialRepository editorialRepository;
    @Autowired
    private EditorialDaoMapper editorialDaoMapper;

    @Override
    public List<EditorialDto> getAll() {
        return editorialDaoMapper.toEditorialsDto(editorialRepository.findAll());
    }

    @Override
    public EditorialDto save(EditorialDto editorialDto) {
        Editorial editorial = editorialDaoMapper.toEditorial(editorialDto);
        return editorialDaoMapper.toEditorialDto(editorialRepository.save(editorial));
    }

    @Override
    public Optional<EditorialDto> getEditorialDto(Long idEditorial) {
        return editorialRepository.findById(idEditorial)
                .map(editorial -> editorialDaoMapper.toEditorialDto(editorial));
    }

    @Override
    public EditorialDto update(Long idEditorial, EditorialDto editorialDto) {
        return getEditorialDto(idEditorial).map(editorialDtoUpdate -> {
            editorialDtoUpdate.setName(editorialDtoUpdate.getName());
            editorialDtoUpdate.setEstablishedDate(
                    editorialDtoUpdate.getEstablishedDate());
            return save(editorialDtoUpdate);
        }).orElse(null);
    }

    @Override
    public void delete(Long idEditorial) {
        editorialRepository.deleteById(idEditorial);
    }
}
