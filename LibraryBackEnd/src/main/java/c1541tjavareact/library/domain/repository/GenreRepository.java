package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
