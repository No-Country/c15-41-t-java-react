package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.PendingDto;
import c1541tjavareact.library.domain.service.PendingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pendings")
public class PendingController {
    @Autowired
    private PendingService pendingService;

    @GetMapping("/all")
    public ResponseEntity<List<PendingDto>> getAll() {
        return ResponseEntity.ok(pendingService.getAll());
    }
    @PostMapping("/save")
    public ResponseEntity<PendingDto> save(@RequestBody @Valid PendingDto pendingDto) {
        return new ResponseEntity<>(pendingService.save(pendingDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PendingDto> getPending(@PathVariable("id") Long idPending) {
        return pendingService.getPending(idPending)
                .map(p -> new ResponseEntity<>(p, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PendingDto> updatePending(@PathVariable("id") Long idPending, @RequestBody PendingDto pendingDto){
        PendingDto pendingUpdated = pendingService.update(idPending, pendingDto);
        if(pendingUpdated!=null){
            return ResponseEntity.ok(pendingUpdated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<PendingDto> deletePending(@PathVariable("id") Long idPending){
        if(pendingService.delete(idPending)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


}
