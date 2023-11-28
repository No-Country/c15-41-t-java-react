package c1541tjavareact.library.entity;

import c1541tjavareact.library.entity.enums.Genre;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_book")
    private Long idBook;
    @NotBlank(message = "Title is mandatory")
    private String title;

    @Enumerated(EnumType.STRING)
    private Genre genre;
    private int quantity;

    @OneToMany(mappedBy = "book")
    private List<Loan> loanList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_author")
    private Author author; //private Long idAuthor;

    @OneToMany(mappedBy = "book") //nombre campo en la clase Editorial
    private List<Editorial> editorialList; //private Long idEditorial;
}
