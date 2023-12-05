package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.*;
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
            authorDtoUpdate.setName(authorDto.getName());
            authorDtoUpdate.setLastName(authorDto.getLastName());
            return save(authorDtoUpdate);
        }).orElse(null);
    }

    @Override
    public void delete(Long idAuthor) {
        authorRepository.deleteById(idAuthor);
    }
}
