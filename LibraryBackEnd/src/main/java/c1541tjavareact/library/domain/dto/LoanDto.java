package c1541tjavareact.library.domain.dto;

import jakarta.validation.constraints.Future;
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

    @NotNull
    @Future
    private LocalDate loanDate;

    @NotNull
    @Future
    private LocalDate returnExpectedDate;

    @NotNull
    private Long idBook;

    @NotNull
    private Long idAdmin;

    @NotNull
    private Long idUser;

    private BookDto bookDto;

    private AdminDto adminDto;

    private UserDto userDto;

//    private BookReturnDto bookReturnDto; //TODO

}
