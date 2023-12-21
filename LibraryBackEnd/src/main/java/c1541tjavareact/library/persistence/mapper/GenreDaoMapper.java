package c1541tjavareact.library.persistence.mapper;


import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.dto.GenreDto;
import c1541tjavareact.library.persistence.entity.Editorial;
import c1541tjavareact.library.persistence.entity.Genre;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface GenreDaoMapper {
    GenreDto toGenreDto (Genre genre);
    List<GenreDto> toGenresDto(List<Genre> genres);

    @InheritInverseConfiguration
    @Mapping(target = "books" , ignore = true)
    Genre toGenre (GenreDto genreDto);

}
