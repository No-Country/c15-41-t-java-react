package c1541tjavareact.library.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */

@Embeddable
@Getter
@Setter
public class BookEditorialPK implements Serializable {

    @Column(name = "id_editorial")
    private long idEditorial;

    @Column(name="id_book")
    private Long idBook;
}
