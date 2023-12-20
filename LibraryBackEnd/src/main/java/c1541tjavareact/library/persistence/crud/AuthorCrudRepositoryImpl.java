package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.*;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.mapper.AuthorDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AuthorCrudRepositoryImpl implements AuthorCrudRepository {

   @Autowired
   private AuthorRepository authorRepository;

   @Autowired
   private AuthorDaoMapper authorDaoMapper;

    @Override
    public List<AuthorDto> getAll() {
        return authorDaoMapper.toAuthorsDto(authorRepository.findAll());
    }

    @Override
   public AuthorDto save(AuthorDto authorDto) {
        //control existencia name y lastName autor en la base de datos
        List<Author> names = authorRepository.findByName(authorDto.getName());
        List<Author> lastNames = authorRepository.findByLastName(authorDto.getLastName());

        if(!names.isEmpty() && !lastNames.isEmpty()){
            throw new BibliotechException("Ya existe un autor con ese nombre y ese apellido.");
        }

        Author author = authorDaoMapper.toAuthor(authorDto);
        return authorDaoMapper.toAuthorDto(authorRepository.save(author));
   }

    @Override
    public Optional<AuthorDto> getAuthorDto(Long idAuthor) {
        return authorRepository.findById(idAuthor)
                .map(author -> authorDaoMapper.toAuthorDto(author));
    }

    @Override
    public AuthorDto update(Long idAuthor, AuthorDto authorDto) {
        return getAuthorDto(idAuthor).map(authorDtoUpdate -> {

            if(authorDto.getName().equalsIgnoreCase(authorDtoUpdate.getName())
                    && authorDto.getLastName().equalsIgnoreCase(authorDtoUpdate.getLastName())){
                throw new BibliotechException("No se pudo actualizar, nuevo nombre y nuevo apellido son los mismo al original.");
            }

            authorDtoUpdate.setName(authorDto.getName());
            authorDtoUpdate.setLastName(authorDto.getLastName());
            return save(authorDtoUpdate);
        }).orElseThrow(() -> new BibliotechException("No se pudo actualizar el autor"));
    }

    @Override
    public void delete(Long idAuthor) {
        authorRepository.deleteById(idAuthor);
    }
}
