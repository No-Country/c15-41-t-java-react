package c1541tjavareact.library.domain.service;

import c1541tjavareact.library.domain.dto.EditorialDto;
import c1541tjavareact.library.domain.repository.EditorialCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditorialService {

    @Autowired
    private EditorialCrudRepository editorialCrudRepository;

    public EditorialDto save(EditorialDto editorialDto) { return editorialCrudRepository.save(editorialDto);}

}
