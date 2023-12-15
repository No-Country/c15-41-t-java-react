package c1541tjavareact.library.domain.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

/**
 * @author jdmon on 15/12/2023
 * @project LibraryBackEnd
 */
@Getter
@Setter
public class ImageDto {
    private Long idImage;
    private String name;
    private String imagenUrl;
    private String cloudinaryId;
}
