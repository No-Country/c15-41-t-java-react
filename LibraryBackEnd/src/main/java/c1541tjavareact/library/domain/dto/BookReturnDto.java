package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookReturnDto {

    private Long idReturn;

    @NotNull
    private Long idLoan;

    @NotNull
    private Boolean status;

    @NotNull
    private LocalDate returnExpectedDate;

    private LocalDate returnDate;

    private LoanDto loanDto;

    private PendingDto pendingDto;
}
