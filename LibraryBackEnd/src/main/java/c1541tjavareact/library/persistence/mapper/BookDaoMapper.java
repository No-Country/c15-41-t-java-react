package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.persistence.entity.Book;

import org.mapstruct.*;

import java.util.List;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Mapper (componentModel = MappingConstants.ComponentModel.SPRING)
public interface BookDaoMapper {
////    @Mapping(source = "idBook",target = "idBook")
////    @Mapping(source = "title",target = "title")
////    @Mapping(source = "isbn",target = "isbn")
////    @Mapping(source = "genre",target = "genre")
////    @Mapping(source = "quantity",target = "quantity")
//    @Mapping(source = "id_author",target = "author")
//    BookDto toBookDto(Book book);
//    List<BookDto> toBooksDto(List<Book> books);
//
//    @InheritInverseConfiguration
//    @Mapping(target = "loanList", ignore = true)
//    Book toBook (BookDto bookDto);
}
