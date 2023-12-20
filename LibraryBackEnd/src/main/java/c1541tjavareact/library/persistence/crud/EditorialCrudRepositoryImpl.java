package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.repository.EditorialCrudRepository;
import c1541tjavareact.library.domain.repository.EditorialRepository;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Author;
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
        //control existencia name editorial en la base de datos
        Optional<Editorial> nameOpt = editorialRepository.findByName(editorialDto.getName());

        if(nameOpt.isPresent()){
            throw new BibliotechException("La editorial ya existe.");
        }

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

            if(editorialDto.getName().equalsIgnoreCase(editorialDtoUpdate.getName())){
                throw new BibliotechException("No se pudo actualizar, nuevo nombre de la editorial es el mismo al original.");
            }

            editorialDtoUpdate.setName(editorialDto.getName());
            return save(editorialDtoUpdate);
        }).orElseThrow(() -> new BibliotechException("No se pudo actualizar la editorial."));
    }

    @Override
    public void delete(Long idEditorial) {
        editorialRepository.deleteById(idEditorial);
    }
}
