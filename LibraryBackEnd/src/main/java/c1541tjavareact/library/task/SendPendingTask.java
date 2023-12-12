/*
package c1541tjavareact.library.task;

import c1541tjavareact.library.domain.dto.LoanDto;
import c1541tjavareact.library.domain.dto.UserDto;
import c1541tjavareact.library.domain.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class SendPendingTask {

    @Autowired
    private LoanService loanService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailAdminRealTmp; //TODO tmp
    @Value("${emailUsuarioTmp}")
    private String emailUsuarioRealTmp; //TODO tmp

    @Scheduled(cron = "0 0 0 * * ?") //cada medianoche
    //@Scheduled(cron = "0 * * * * ?")//cada minuto
    //@Scheduled(fixedRate = 10000) // cada 10 segundos
    public void verificarPrestamosPorVencer() {
        System.out.println("Entro a metodo scheduled");
        List<LoanDto> loans = loanService.getAll();
        //TODO mejora bookReturns
        //List<BookReturnDto> bookReturns = bookReturnService.getAll();
        LocalDate currentDate = LocalDate.now();

        for (LoanDto ld : loans) {
            LocalDate alertDate = ld.getReturnExpectedDate().minusDays(3);
            */
/*BookReturnDto bookReturn = bookReturns.stream().filter(br -> br.getIdLoan().equals(ld.getIdLoan()))
                                                            .toList().get(0);*//*

            if (currentDate.equals(alertDate) */
/*&& bookReturn.getReturnDate() == null*//*
) {
                this.sendMail(ld);
            }
        }
    }

    public void sendMail(LoanDto loanDto){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        UserDto userDto = loanDto.getUserDto();
        simpleMailMessage.setTo(emailUsuarioRealTmp); //TODO tmp
        //simpleMailMessage.setTo(userDto.getEmail());

        simpleMailMessage.setFrom(emailAdminRealTmp); //TODO tmp o crear email unico para biblioteca
        //simpleMailMessage.setFrom(loanDto.getAdminDto().getEmail());

        simpleMailMessage.setSubject("Recordatorio devolucion de libro: ");

        simpleMailMessage.setText("""
                Hola %S %S,
                
                La devolucion del libro  %S es el dia %S.
                
                Gracias,
                
                %S %S
                Grupo Bibliotech
                """
                .formatted(userDto.getName(), userDto.getLastName(),
                            loanDto.getBookDto().getTitle(),
                            loanDto.getReturnExpectedDate(),
                            loanDto.getAdminDto().getName(), loanDto.getAdminDto().getLastName()
                )
        );

        javaMailSender.send(simpleMailMessage);
    }
}

*/
