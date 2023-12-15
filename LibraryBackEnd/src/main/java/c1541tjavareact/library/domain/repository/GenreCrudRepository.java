package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.GenreDto;

import java.util.List;
import java.util.Optional;

public interface GenreCrudRepository {

    List<GenreDto> getAll();

    GenreDto save(GenreDto genreDto);

    Optional<GenreDto> getGenreDto(Long idGenre);

    GenreDto update(Long idGenre, GenreDto genreDto);

    void delete(Long idGenre);

}
