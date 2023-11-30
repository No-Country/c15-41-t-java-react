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

//    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name="id_book",nullable = false,
////            referencedColumnName = "id_book")
//    private Book book;

    @Column(nullable = false)
    private String name;

    @Column(name = "established_date",nullable = false)
    private LocalDate establishedDate;

    @ManyToMany(mappedBy = "linkedEditorials")
    private List<Book> likes;

//    @OneToMany(mappedBy = "editorial", cascade = CascadeType.ALL)
//    private List<BookEditorial> editorialList;
}
