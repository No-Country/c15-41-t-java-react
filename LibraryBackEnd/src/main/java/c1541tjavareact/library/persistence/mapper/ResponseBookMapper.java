package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.ResponseBookDto;
import c1541tjavareact.library.persistence.entity.Book;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResponseBookMapper {
//
//    @Mapping(source = "title",target = "title")
//    @Mapping(source = "isbn",target = "isbn")
//    ResponseBookDto toResponseBookDto(Book book);
//    List<BookDto> toResponseBooksDto(List<Book> books);
//
//    @InheritInverseConfiguration
//    @Mapping(target = "loanList", ignore = true)
//    Book toBook (ResponseBookDto responseBookDto);
}
