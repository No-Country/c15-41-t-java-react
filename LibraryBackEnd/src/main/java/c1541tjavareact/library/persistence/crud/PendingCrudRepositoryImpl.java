package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.PendingDto;
import c1541tjavareact.library.domain.repository.PendingCrudRepository;
import c1541tjavareact.library.domain.repository.PendingRepository;
import c1541tjavareact.library.persistence.entity.Pending;
import c1541tjavareact.library.persistence.mapper.PendingDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PendingCrudRepositoryImpl implements PendingCrudRepository {

    @Autowired
    private PendingRepository pendingRepository;

    @Autowired
    private PendingDaoMapper pendingDaoMapper;

    @Override
    public List<PendingDto> getAll() {
        List<Pending> pendings = pendingRepository.findAll();
        return pendingDaoMapper.toPendingsDto(pendings);
    }

    @Override
    public PendingDto save(PendingDto pendingDto) {
        Pending pending = pendingDaoMapper.toPending(pendingDto);
        return pendingDaoMapper.toPendingDto(pendingRepository.save(pending));
    }

    @Override
    public Optional<PendingDto> getPending(Long idPending) {
        return pendingRepository.findById(idPending).map(p -> pendingDaoMapper.toPendingDto(p));
    }

    @Override
    public Optional<PendingDto> findByIdLoan(Long idLoan) {
        return pendingRepository.findByIdLoan(idLoan).map(p -> pendingDaoMapper.toPendingDto(p));
    }

    @Override
    public PendingDto update(Long idPending, PendingDto pendingDto) {
        Optional<PendingDto> optPending = this.getPending(idPending);
        if(optPending.isPresent()){
            PendingDto pendingToUpdate = optPending.get();
            pendingToUpdate.setMessage(pendingDto.getMessage());
            pendingToUpdate.setLocalPendingDate(pendingDto.getLocalPendingDate());
            //pendingToUpdate.setIdReturn(pendingDto.getIdReturn());
            return this.save(pendingToUpdate);
        }
        return null;
    }

    @Override
    public boolean delete(Long idPending) {
        Optional<PendingDto> optBook = this.getPending(idPending);
        if(optBook.isPresent()){
            pendingRepository.deleteById(idPending);
            return true;
        }
        return false;
    }
}
