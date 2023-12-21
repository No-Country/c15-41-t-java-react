package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.PendingDto;

import java.util.List;
import java.util.Optional;

public interface PendingCrudRepository {

    List<PendingDto> getAll();
    PendingDto save(PendingDto pendingDto);

    Optional<PendingDto> getPending(Long idPending);

    Optional<PendingDto> findByIdLoan(Long idLoan);

    PendingDto update(Long idPending, PendingDto pendingDto);
    boolean delete(Long idPending);


}
