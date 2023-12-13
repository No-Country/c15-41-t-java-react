package c1541tjavareact.library.domain.dto;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import static c1541tjavareact.library.domain.util.constant.Constants.*;

@Getter
@Setter
public class EditorialDto {

    private long idEditorial;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ' ]{3,50}$",
            message = INVALID_CHARACTERS)
    private String name;

    @NotNull
    @Past(message = INVALID_PAST_DATE)
    private LocalDate establishedDate;

}
