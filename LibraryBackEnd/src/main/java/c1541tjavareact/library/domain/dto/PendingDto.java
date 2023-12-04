package c1541tjavareact.library.domain.dto;

import c1541tjavareact.library.persistence.entity.BookReturn;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PendingDto {

    private Long idPending;

    @NotBlank
    private String message;

    @NotNull
    private LocalDate localPendingDate;

//    @NotNull
//    private BookReturnDto bookReturnDto; //TODO

}
