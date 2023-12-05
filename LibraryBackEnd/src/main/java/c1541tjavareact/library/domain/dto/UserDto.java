package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
//@Component
public class UserDto {

    private Long idUser;

    @NotBlank
    private String dni;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z ]{3,}$")
    private String name;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z ]{3,}$")
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
