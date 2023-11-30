package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.domain.repository.*;
import c1541tjavareact.library.persistence.entity.Author;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.mapper.AuthorDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Repository
public class AuthorCrudRepositoryImpl implements AuthorCrudRepository {

   @Autowired
   private AuthorRepository authorRepository;

   @Autowired
   private AuthorDaoMapper authorDaoMapper;
   @Override
   public AuthorDto save(AuthorDto authorDto) {
       Author author = authorDaoMapper.toAuthor(authorDto);
       return authorDaoMapper.toAuthorDto(authorRepository.save(author));
   }
}
