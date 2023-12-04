package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.persistence.entity.Loan;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LoanDaoMapper {

    LoanDto toLoanDto(Loan loan);
    List<LoanDto> toLoansDto(List<Loan> loans);

    @InheritInverseConfiguration
    Loan toLoan (LoanDto loans);
}
