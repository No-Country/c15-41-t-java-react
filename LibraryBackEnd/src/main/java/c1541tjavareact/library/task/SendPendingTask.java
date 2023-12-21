
package c1541tjavareact.library.task;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.repository.LoanCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class SendPendingTask {

    @Autowired
    private LoanCrudRepository loanCrudRepository;

    @Scheduled(cron = "0 0 0 * * ?") //cada medianoche
    //@Scheduled(cron = "0 * * * * ?")//cada minuto
    //@Scheduled(fixedRate = 10000) // cada 10 segundos
    public void verificarPrestamosPorVencer() {
        System.out.println("Entro a metodo scheduled");
        List<LoanDto> loans = loanCrudRepository.getAll();
        LocalDate currentDate = LocalDate.now();

        for (LoanDto ld : loans) {
            LocalDate alertDate = ld.getReturnExpectedDate().minusDays(1);

            if (currentDate.equals(alertDate) && ld.getReturnEffectiveDate() == null) {
                loanCrudRepository.sendTaskMail(ld);
            }
        }
    }


}


