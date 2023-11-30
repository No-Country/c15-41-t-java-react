package c1541tjavareact.library.domain.dto;


import c1541tjavareact.library.persistence.entity.enums.Genre;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


/**
 * @author jdmon on 29/11/2023
 * @project LibraryBackEnd
 */
@Getter
@Setter
public class AuthorDto {

    private Long idAuthor;

    private String name;

    private String lastName;
}
