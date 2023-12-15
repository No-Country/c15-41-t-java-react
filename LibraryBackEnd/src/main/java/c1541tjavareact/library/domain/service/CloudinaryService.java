package c1541tjavareact.library.domain.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;



@Service
public class CloudinaryService {

    @Value("${api.secret.cloudinary}")
    private String API_SECRET;

    Cloudinary cloudinary;

    private Map<String, String> valuesMap = new HashMap<>();
    @PostConstruct
    public void init() {
        valuesMap.put("cloud_name", "dnasbdg0i");
        valuesMap.put("api_key", "141123942543251");
        valuesMap.put("api_secret", API_SECRET);
        cloudinary = new Cloudinary(valuesMap);
    }


    public Map upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        Map result = cloudinary.uploader().upload(file, ObjectUtils.asMap("folder", "Bibliotech/"));
        file.delete();
        return result;
    }
    public Map uploadPrueba(File file) throws IOException {
        Map result = cloudinary.uploader().upload(file, ObjectUtils.asMap("folder", "Bibliotech/"));
        file.delete();
        return result;
    }

    public Map delete(String id) throws IOException {
        Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        return result;
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }
}