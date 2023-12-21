package c1541tjavareact.library.persistence.mapper;


import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.persistence.entity.Editorial;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EditorialDaoMapper {
    EditorialDto toEditorialDto (Editorial editorial);

    List<EditorialDto> toEditorialsDto(List<Editorial> editorials);
    @InheritInverseConfiguration
    @Mapping(target = "books" , ignore = true)
    Editorial toEditorial (EditorialDto editorialDto);

}
