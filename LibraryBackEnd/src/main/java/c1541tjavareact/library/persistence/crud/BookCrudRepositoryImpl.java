package c1541tjavareact.library.persistence.crud;

import c1541tjavareact.library.domain.dto.BookDto;
import c1541tjavareact.library.domain.dto.ImageDto;
import c1541tjavareact.library.domain.repository.*;
import c1541tjavareact.library.domain.service.CloudinaryService;
import c1541tjavareact.library.infra.exception.BibliotechException;
import c1541tjavareact.library.persistence.entity.Book;
import c1541tjavareact.library.persistence.entity.Image;
import c1541tjavareact.library.persistence.entity.Loan;
import c1541tjavareact.library.persistence.mapper.BookDaoMapper;
import c1541tjavareact.library.persistence.mapper.ImageDaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Repository
public class BookCrudRepositoryImpl implements BookCrudRepository {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookDaoMapper bookDaoMapper;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageDaoMapper imageDaoMapper;

    @Autowired
    private LoanRepository loanRepository;

    @Override
    public List<BookDto> getAll() {
        List<Book> books = bookRepository.findAll();
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto save(BookDto bookDto) {
        Long idImage=1L;
        idImage = getUpdateIdImage(bookDto, idImage);
        bookDto.setIdImage(idImage);

        return saveBookLoan(bookDto);
    }
    public BookDto saveBookLoan(BookDto bookDto) {
        Book book = bookDaoMapper.toBook(bookDto);
        return bookDaoMapper.toBookDto(bookRepository.save(book));
    }

    private Long getUpdateIdImage(BookDto bookDto, Long idImage) {

        if (isImageNotNullNotEmpty(bookDto)){

            //Control existencia imagen en base de datos
            int lastIndexImageName= Objects.requireNonNull(bookDto.getImage().getOriginalFilename()).lastIndexOf(".");
            Optional<Image> imageOptional = imageRepository.findByName(bookDto.getImage().getOriginalFilename().substring(0,lastIndexImageName));
            if(imageOptional.isPresent()){
                return imageOptional.get().getIdImage();
            }

            //Imagen no existe en la base de datos
            try {
                BufferedImage bi = ImageIO.read(bookDto.getImage().getInputStream());
                Map result = cloudinaryService.upload(bookDto.getImage());
                Image image = new Image();
                image.setName((String) result.get("original_filename"));
                image.setImagenUrl((String) result.get("url"));
                image.setCloudinaryId((String) result.get("public_id"));
                ImageDto imageSaved = imageDaoMapper.toImageDto(imageRepository.save(image));

                idImage = imageSaved.getIdImage();

            } catch (IOException e) {
                throw new BibliotechException("La imagen no se pudo leer" +
                        "No se pudo crear el libro");
            }
        }
        return idImage;
    }

    @Override
    public Optional<BookDto> getBook(Long idBook) {
        return bookRepository.findById(idBook).map(Book -> bookDaoMapper.toBookDto(Book));
    }

    @Override
    public List<BookDto> searchBooksBytitleGenreAuthor(String titleGenreAuthor){
        List<Book> books = bookRepository.searchBooksBytitleGenreAuthor(titleGenreAuthor);
        return bookDaoMapper.toBooksDto(books);
    }

    @Override
    public BookDto update(Long idBook, BookDto bookDto) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){
            BookDto bookToUpdate = optBook.get();
            bookToUpdate.setTitle(bookDto.getTitle());
            bookToUpdate.setIdAuthor(bookDto.getIdAuthor());
            bookToUpdate.setIdEditorial(bookDto.getIdEditorial());
            if(!bookToUpdate.getIsbn().equalsIgnoreCase(bookDto.getIsbn())){
                bookToUpdate.setIsbn(bookDto.getIsbn());
            }
            bookToUpdate.setIdGenre(bookDto.getIdGenre());
            bookToUpdate.setQuantity(bookDto.getQuantity());
            Long newIdImage = getUpdateIdImage(bookDto,bookToUpdate.getIdImage());
            bookToUpdate.setIdImage(newIdImage);
            return saveBookLoan(bookToUpdate);
        }
        return null;
    }

    @Override
    public boolean delete(Long idBook) {
        Optional<BookDto> optBook = this.getBook(idBook);
        if(optBook.isPresent()){

            //control si idBook existe en loans
            List<Loan> byIdBook = loanRepository.findByIdBook(idBook);
            //byIdBook = byIdBook.stream().filter(b -> b.getReturnEffectiveDate()==null).toList();
            if(!byIdBook.isEmpty()){
                throw new BibliotechException("No se puede eliminar un libro que haya sido prestato alguna vez.");
            }

            bookRepository.deleteById(idBook);
            return true;
        }
        return false;

    }

    private boolean isImageNotNullNotEmpty(BookDto bookDto) {
        return bookDto.getImage() != null &&
                !bookDto.getImage().isEmpty();
    }

}
