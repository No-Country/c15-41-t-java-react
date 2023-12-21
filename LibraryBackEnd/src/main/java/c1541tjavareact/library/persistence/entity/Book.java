package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_book")
    private Long idBook;

    @Column(nullable = false)
    private String title;

    @Column(name = "id_author", nullable = false)
    private Long idAuthor;

    @Column(name = "id_editorial", nullable = false)
    private Long idEditorial;

    @Column(nullable = false,unique = true)
    private String isbn;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "is_active")
    private Boolean isActive = Boolean.TRUE;

    @Column(name = "id_genre", nullable = false)
    private Long idGenre;

    @Column(name = "id_image")
    private Long idImage;

    @OneToMany(mappedBy = "book")
    private List<Loan> loanList;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_editorial", nullable = false, insertable = false, updatable = false)
    private Editorial editorial;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_author", nullable = false, insertable = false, updatable = false)
    private Author author;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_genre", nullable = false, insertable = false, updatable = false)
    private Genre genre;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_image", insertable = false, updatable = false)
    private Image imageBook;

}
