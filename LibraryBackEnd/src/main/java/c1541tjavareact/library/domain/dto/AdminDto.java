package c1541tjavareact.library.domain.dto;


import c1541tjavareact.library.persistence.entity.Loan;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminDto {

    private Long idAdmin;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]{3,}$")
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]{3,}$")
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
