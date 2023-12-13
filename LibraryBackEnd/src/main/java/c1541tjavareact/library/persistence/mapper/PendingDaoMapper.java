package c1541tjavareact.library.persistence.mapper;

import c1541tjavareact.library.domain.dto.PendingDto;
import c1541tjavareact.library.persistence.entity.Pending;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PendingDaoMapper {

    @Mapping(source = "loan", target = "loanDto")
    PendingDto toPendingDto(Pending pending);

    List<PendingDto>  toPendingsDto(List<Pending> pendings);

    @InheritInverseConfiguration
    Pending toPending(PendingDto loanDto);
}
