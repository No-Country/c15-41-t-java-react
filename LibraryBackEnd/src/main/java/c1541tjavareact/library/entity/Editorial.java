package c1541tjavareact.library.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "editorial")
public @Data class Editorial implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEditorial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_book")
    private Book book;

    private String name;

    private Date localDate;
}
