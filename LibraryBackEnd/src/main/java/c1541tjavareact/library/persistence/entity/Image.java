package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_image")
    private Long idImage;

    @Column(nullable = false)
    private String name;

    @Column(name = "imagen_url", nullable = false)
    private String imagenUrl;

    @Column(name = "cloudinary_id", nullable = false)
    private String cloudinaryId;

    @OneToMany(mappedBy = "imageBook")
    private List<Book> books;
}