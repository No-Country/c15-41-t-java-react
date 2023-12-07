package c1541tjavareact.library.domain.dto;

import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
//@Component
public class UserDto {

    private Long idUser;

    @NotBlank(message = "El campo no debe ser vacio")
    private String dni;

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
    private String phoneNumber;

    @NotBlank
    private String address;

    private List<LoanDto> loansDto;

    private boolean isActive = true;

}
