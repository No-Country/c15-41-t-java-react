package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(nullable = false)
    private String imagenUrl;

    @Column(nullable = false)
    private String cloudinaryId;
}