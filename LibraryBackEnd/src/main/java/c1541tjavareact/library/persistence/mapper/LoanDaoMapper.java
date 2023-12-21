package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.persistence.entity.Loan;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LoanDaoMapper {

    @Mapping(source = "book", target = "bookDto")
    @Mapping(source = "admin", target = "adminDto")
    @Mapping(source = "user", target = "userDto")
    @Mapping(source = "book.author", target = "bookDto.authorDto")
    @Mapping(source = "book.editorial", target = "bookDto.editorialDto")
    LoanDto toLoanDto(Loan loan);
    List<LoanDto> toLoansDto(List<Loan> loans);

    @InheritInverseConfiguration
    Loan toLoan (LoanDto loans);
}
