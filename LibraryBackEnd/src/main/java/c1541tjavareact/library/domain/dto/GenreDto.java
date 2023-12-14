package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreDto {

    private long idGenre;

    @NotBlank
    private String name;
}
