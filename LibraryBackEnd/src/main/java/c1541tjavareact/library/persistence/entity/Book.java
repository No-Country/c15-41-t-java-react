package c1541tjavareact.library.persistence.entity;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.persistence.entity.enums.Genre;
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

    @Column(nullable = false,unique = true)
    private String isbn;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;

    @Column(nullable = false)
    private Integer quantity;

    private Integer id_author_2;

    @OneToMany(mappedBy = "book")
    private List<Loan> loanList;

    @OneToMany(mappedBy = "book")
    private List<BookEditorial> editorialList;

    @ManyToOne
    @JoinColumn(name = "id_author", insertable=false, updatable=false)
    private Author author;

}
