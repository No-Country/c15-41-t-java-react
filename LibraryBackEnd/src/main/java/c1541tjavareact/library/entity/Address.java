package c1541tjavareact.library.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * @author jdmon on 28/09/2023.
 * @project api
 */
@Embeddable
@Getter // propiedades de lombok
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    private String street;
    private String city;
    private String number;
    private String complement;

}
