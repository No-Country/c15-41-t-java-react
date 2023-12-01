package c1541tjavareact.library.domain.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorDto {

    private Long idAuthor;

    @NotBlank
    private String name;

    @NotBlank
    private String lastName;
}
