package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.repository.EditorialCrudRepository;
import c1541tjavareact.library.domain.repository.EditorialRepository;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.mapper.EditorialDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class EditorialCrudRepositoryImpl implements EditorialCrudRepository {

    @Autowired
    private EditorialRepository editorialRepository;
    @Autowired
    private EditorialDaoMapper editorialDaoMapper;

    @Override
    public EditorialDto save(EditorialDto editorialDto) {
        Editorial editorial = editorialDaoMapper.toEditorial(editorialDto);
        return editorialDaoMapper.toEditorialDto(editorialRepository.save(editorial));
    }
}
