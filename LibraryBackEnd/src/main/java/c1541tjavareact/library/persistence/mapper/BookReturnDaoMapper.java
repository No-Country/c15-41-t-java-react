package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.BookReturnDto;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.BookReturn;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BookReturnDaoMapper {

    @Mapping(source = "pending", target = "pendingDto")
//    @Mapping(source = "loan", target = "loanDto")
    BookReturnDto toBookReturnDto(BookReturn bookReturn);

    List<BookReturnDto> toBookReturnsDto(List<BookReturn> bookReturns);
    @InheritInverseConfiguration
    BookReturn toBookReturn(BookReturnDto bookReturnDto);

}
