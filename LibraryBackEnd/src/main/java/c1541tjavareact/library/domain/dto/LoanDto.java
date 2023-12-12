package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class LoanDto {

    private Long idLoan;

    private LocalDate loanDate;

    @NotNull
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

    private PendingDto pendingDto;

}
