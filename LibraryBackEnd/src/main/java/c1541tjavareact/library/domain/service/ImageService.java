package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.repository.ImageCrudRepository;
import c1541tjavareact.library.domain.repository.ImageRepository;
import c1541tjavareact.library.persistence.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageService implements ImageCrudRepository {
    @Autowired
    ImageRepository imageRepository;
    @Override
    public Optional<Image> getImage(Long id) {
        return Optional.empty();
    }
    @Override
    public void save(Image image){
        imageRepository.save(image);
    }
}