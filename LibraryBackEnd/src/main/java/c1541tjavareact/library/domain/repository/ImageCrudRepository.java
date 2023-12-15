package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Image;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ImageCrudRepository {

    public Optional<Image> getImage(Long id);
    public void save(Image image);

}
