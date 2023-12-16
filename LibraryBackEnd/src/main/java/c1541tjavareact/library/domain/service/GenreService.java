package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.GenreDto;
import c1541tjavareact.library.domain.repository.GenreCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenreService {

    @Autowired
    private GenreCrudRepository genreCrudRepository;

    public List<GenreDto> getAll() {
        return genreCrudRepository.getAll();
    }

    public GenreDto save(GenreDto genreDto) {
        return genreCrudRepository.save(genreDto);
    }

    public Optional<GenreDto> getGenreDto(Long idGenre) {
        return genreCrudRepository.getGenreDto(idGenre);
    }

    public GenreDto update(Long idGenre, GenreDto genreDto) {
        return genreCrudRepository.update(idGenre,genreDto);
    }

    public void delete(Long idGenre) {
        genreCrudRepository.delete(idGenre);
    }

}
