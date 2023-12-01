package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.AuthorDto;
import c1541tjavareact.library.persistence.entity.Author;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Mapper (componentModel = MappingConstants.ComponentModel.SPRING)
public interface AuthorDaoMapper {
    AuthorDto toAuthorDto (Author author);
    List<AuthorDto> toAuthorsDto(List<Author> authors);
    @InheritInverseConfiguration
    @Mapping(target = "books" , ignore = true)
    Author toAuthor (AuthorDto authorDto);

}
