package c1541tjavareact.library.persistence.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "author")
public class Author {

    @Id
    private String id;
    private String name;
    private String lastName;

    @OneToMany(mappedBy = "author")
    private List<Book> Books;

}
