package c1541tjavareact.library.domain.util.constant;

public class Constants {

    public final static String INVALID_CHARACTERS = "El campo contiene caracteres inválidos";

    public final static String INVALID_EMAIL = "El email no es válido";

    public final static String INVALID_PASSWORD = """ 
             El campo debe ser mínimo de 8 caracteres,
             al menos una letra mayúscula,
             y opcionalmente solo se permite los siguientes caracteres especiales:
             .!@#$&*%_-=
            """;

    public final static String INVALID_ISBN = "El ISBN debe ser de formato 10 o 13";
    public final static String MIN_QUANTITY = "La cantidad debe ser mayor de 0";
    public final static String MAX_QUANTITY = "La cantidad debe ser menor de 999";
    public final static String INVALID_PAST_DATE = "La fecha debe ser anterior a la fecha actual";
    public final static String INVALID_LOAN_DAYS = "La fecha de devolución supera los 15 días límites permitidos";
    public final static String INVALID_FUTURE_DATE = "La fecha debe ser posterior a la fecha actual";
    public final static String INVALID_DNI = "El DNI no es válido";
    public final static String INVALID_PHONE_NUMBER = "El número de teléfono no es válido";
}
