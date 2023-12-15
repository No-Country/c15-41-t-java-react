package c1541tjavareact.library.persistence.mapper;


import c1541tjavareact.library.domain.dto.ImageDto;
import c1541tjavareact.library.persistence.entity.Image;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ImageDaoMapper {
    ImageDto toImageDto (Image image);
    List<ImageDto> toImagesDto(List<Image> images);
    @InheritInverseConfiguration
    @Mapping(target = "books" , ignore = true)
    Image toImage (ImageDto imageDto);

}
