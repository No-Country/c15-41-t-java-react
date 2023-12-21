package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import static c1541tjavareact.library.domain.util.constant.Constants.INVALID_FUTURE_DATE;

@Getter
@Setter
public class LoanDto {

    private Long idLoan;

    private LocalDate loanDate;

    @NotNull
    @Future(message = INVALID_FUTURE_DATE)
    private LocalDate returnExpectedDate;

    private LocalDate returnEffectiveDate;

    @NotNull
    private Long idBook;

    @NotNull
    private Long idAdmin;

    @NotNull
    private Long idUser;

    private BookDto bookDto;

    private AdminDto adminDto;

    private UserDto userDto;

}
