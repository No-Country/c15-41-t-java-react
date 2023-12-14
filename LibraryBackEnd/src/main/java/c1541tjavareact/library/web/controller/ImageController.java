package c1541tjavareact.library.web.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import c1541tjavareact.library.domain.service.CloudinaryService;
import c1541tjavareact.library.domain.service.ImageService;
import c1541tjavareact.library.persistence.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ImageService imageService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getImagen(@PathVariable Long id) throws IOException {
        Image imageData = imageService.getImage(id).get();
        return ResponseEntity.status(HttpStatus.OK).body(imageData);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("imagen") MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("imagen no válida", HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image();
        image.setName((String) result.get("original_filename"));
        image.setImagenUrl((String) result.get("url"));
        image.setCloudinaryId((String) result.get("public_id"));

        imageService.save(image);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }

}
