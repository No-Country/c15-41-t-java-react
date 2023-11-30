package c1541tjavareact.library.domain.dto;


import c1541tjavareact.library.persistence.entity.Book;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Getter
@Setter
public class EditorialDto {

    private long idEditorial;

    private String name;

    private LocalDate establishedDate;
}
