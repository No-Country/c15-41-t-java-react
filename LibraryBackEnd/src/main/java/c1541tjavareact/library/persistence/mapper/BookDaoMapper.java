package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.persistence.entity.Book;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BookDaoMapper {
    @Mapping(source = "author", target = "authorDto")
    @Mapping(source = "editorial", target = "editorialDto")
    BookDto toBookDto (Book book);
    List<BookDto> toBooksDto(List<Book> books);
    @InheritInverseConfiguration
    @Mapping(target = "loanList" , ignore = true)
    Book toBook (BookDto bookDto);

}
