package c1541tjavareact.library.domain.repository;

import c1541tjavareact.library.domain.dto.BookReturnDto;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface BookReturnCrudRepository {

    BookReturnDto save(BookReturnDto bookReturnDto);

    Optional<BookReturnDto> getBookReturn(Long idBookReturn);
}
