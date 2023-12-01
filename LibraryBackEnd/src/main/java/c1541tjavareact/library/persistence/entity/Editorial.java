package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "editorials")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Editorial implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_editorial")
    private long idEditorial;

    @Column(nullable = false)
    private String name;

    @Column(name = "established_date",nullable = false)
    private LocalDate establishedDate;

    @OneToMany(mappedBy = "editorial")
    private List<Book> books;

}
