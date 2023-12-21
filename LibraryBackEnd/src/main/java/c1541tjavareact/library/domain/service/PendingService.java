package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.PendingDto;
import c1541tjavareact.library.domain.repository.PendingCrudRepository;
import c1541tjavareact.library.persistence.entity.Pending;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PendingService {

    @Autowired
    private PendingCrudRepository pendingCrudRepository;

    public List<PendingDto> getAll(){
        return pendingCrudRepository.getAll();
    }
    public PendingDto save(PendingDto pendingDto){
        return pendingCrudRepository.save(pendingDto);
    }

    public Optional<PendingDto> getPending(Long idPending){
        return pendingCrudRepository.getPending(idPending);
    }

    public Optional<PendingDto> findByIdLoan(Long idLoan){
        return pendingCrudRepository.findByIdLoan(idLoan);
    }


    public PendingDto update(Long idPending, PendingDto pendingDto){
        return pendingCrudRepository.update(idPending, pendingDto);
    }
    public boolean delete(Long idPending){
        return pendingCrudRepository.delete(idPending);
    }
}
