package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.GenreDto;
import c1541tjavareact.library.domain.repository.GenreCrudRepository;
import c1541tjavareact.library.domain.repository.GenreRepository;
import c1541tjavareact.library.persistence.entity.Genre;
import c1541tjavareact.library.persistence.mapper.GenreDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class GenreCrudRepositoryImpl implements GenreCrudRepository {

    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private GenreDaoMapper genreDaoMapper;

    @Override
    public List<GenreDto> getAll() {
        return genreDaoMapper.toGenresDto(genreRepository.findAll());
    }

    @Override
    public GenreDto save(GenreDto genreDto) {
        Genre genre = genreDaoMapper.toGenre(genreDto);
        return genreDaoMapper.toGenreDto(genreRepository.save(genre));
    }

    @Override
    public Optional<GenreDto> getGenreDto(Long idGenre) {
        return genreRepository.findById(idGenre)
                .map(genre -> genreDaoMapper.toGenreDto(genre));
    }

    @Override
    public GenreDto update(Long idGenre, GenreDto genreDto) {
        return this.getGenreDto(idGenre).map(genre -> {
            genre.setName(genreDto.getName());
            return save(genre);
        }).orElse(null);
    }

    @Override
    public void delete(Long idGenre) {
        genreRepository.deleteById(idGenre);
    }
}
