package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.persistence.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
