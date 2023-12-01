package c1541tjavareact.library.domain.dto;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EditorialDto {

    private long idEditorial;

    @NotBlank
    private String name;

    @NotNull
    private LocalDate establishedDate;

}
