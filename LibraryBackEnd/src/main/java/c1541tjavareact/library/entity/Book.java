package c1541tjavareact.library.entity;

import c1541tjavareact.library.entity.enums.Genre;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;

    @Column(nullable = false)
    private Integer quantity;

    @OneToMany(mappedBy = "book")
    private List<Loan> loanList;

    @OneToMany(mappedBy = "book")
    private List<Editorial> editorialList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_author",nullable = false,
            referencedColumnName = "id_author")
    private Author author;


}
