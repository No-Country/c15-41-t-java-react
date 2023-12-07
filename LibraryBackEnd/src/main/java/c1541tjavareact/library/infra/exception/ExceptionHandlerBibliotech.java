package c1541tjavareact.library.infra.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author jdmon on 7/12/2023
 * @project LibraryBackEnd
 */
@RestControllerAdvice
public class ExceptionHandlerBibliotech {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<DataError>> argumentGotcha(MethodArgumentNotValidException exception){
        var errors=exception.getFieldErrors().stream().map(DataError::new).toList();
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> argumentGotcha2(SQLIntegrityConstraintViolationException exception){
        System.out.println(exception.getMessage());
        int first=exception.getMessage().indexOf(" '");
        int second=exception.getMessage().indexOf("' ");
        String message= exception.getMessage().substring(first+2,second);
        Map<String, Object> errors = new HashMap<>();
        errors.put("valorDuplicado", message);

        return ResponseEntity.badRequest().body(errors);
    }

    private record DataError(String field, String error){
        public DataError(FieldError error){
            this(error.getField(),error.getDefaultMessage());
        }
    }

}
