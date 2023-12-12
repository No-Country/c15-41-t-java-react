package c1541tjavareact.library.web.controller;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.service.LoanService;
import c1541tjavareact.library.persistence.entity.Loan;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @GetMapping("/all")
    public ResponseEntity<List<LoanDto>> getAll() {
        return ResponseEntity.ok(loanService.getAll());
    }
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid LoanDto loanDto) {

            return new ResponseEntity<>(loanService.save(loanDto), HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDto> getLoan(@PathVariable("id") Long idLoan) {
        return loanService.getLoan(idLoan)
                .map(l -> new ResponseEntity<>(l, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LoanDto> updateLoan(@PathVariable("id") Long idLoan, @RequestBody LoanDto loanDto){
        LoanDto loanUpdated = loanService.update(idLoan, loanDto);
        if(loanUpdated!=null){
            return ResponseEntity.ok(loanUpdated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<LoanDto> returnBookLoan(@PathVariable("id") Long idLoan){
        LoanDto loanUpdated = loanService.returnBookLoan(idLoan);
        if(loanUpdated!=null){
            return ResponseEntity.ok(loanUpdated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Loan> deleteLoan(@PathVariable("id") Long idLoan){//TODO
        if(loanService.delete(idLoan)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
