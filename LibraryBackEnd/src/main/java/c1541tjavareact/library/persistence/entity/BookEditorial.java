package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.*;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */

@Entity
@Table(name = "books_editorials")
public class BookEditorial {
    @EmbeddedId
    private BookEditorialPK id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "id_book", insertable=false, updatable=false)
    private Book book;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "id_editorial", insertable=false, updatable=false)
    private Editorial editorial;

}
