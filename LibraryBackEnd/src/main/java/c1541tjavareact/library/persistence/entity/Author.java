package c1541tjavareact.library.persistence.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "authors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Author implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_author")
    private Long idAuthor;

    @Column(nullable = false)
    private String name;

    @Column(name = "last_name",nullable = false)
    private String lastName;

    @OneToMany(mappedBy = "author")
    private List<Book> books;

}
