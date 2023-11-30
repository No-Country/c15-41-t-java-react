package c1541tjavareact.library.persistence.entity;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "book")
    private List<Loan> loanList;

//    @OneToMany
//    private List<BookEditorial> editorialList;

    @ManyToMany
    @JoinTable(
            name = "linked_editorials",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_editorial")
    )
    private List<Editorial> linkedEditorials=new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_author",nullable = false)
    private Author author;

    public Book(BookDto bookDto,Author author, Editorial editorial) {
        this.title= bookDto.title();
        this.isbn= bookDto.isbn();
        this.genre= bookDto.genre();
        this.quantity= bookDto.quantity();
        this.author=author;
        this.linkedEditorials.add(editorial);
    }
}
