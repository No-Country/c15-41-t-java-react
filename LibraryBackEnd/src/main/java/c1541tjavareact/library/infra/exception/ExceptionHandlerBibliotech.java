package c1541tjavareact.library.infra.exception;

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
    public ResponseEntity<List<DataError>> handleValidationException(
            MethodArgumentNotValidException exception){
        var errors=exception.getFieldErrors()
                .stream().
                map(DataError::new)
                .toList();
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstraintViolationException(
            SQLIntegrityConstraintViolationException exception){
        Map<String, String> errors = new HashMap<>();
        String message = exception.getMessage();
        if (message != null && message.startsWith("Duplicate")) {
            errors.put("valorDuplicado", message.substring(
                    message.indexOf(" '") + 2,
                    message.indexOf("' ")
            ));
        } else if (message != null && message.startsWith("Cannot")){
            errors.put("message", "Acción no permitida");
        }
        else errors.put("message","Error de restricción de integridad" + message);
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(BookException.class)
    public ResponseEntity<Map<String, Object>> handleBookException(
            BookException exception){
        Map<String, Object> errors = new HashMap<>();
        errors.put("CantidadLibros", exception.getMessage());
        return ResponseEntity.badRequest().body(errors);
    }


    private record DataError(String field, String error){
        public DataError(FieldError error){
            this(error.getField(),error.getDefaultMessage());
        }
    }

}
