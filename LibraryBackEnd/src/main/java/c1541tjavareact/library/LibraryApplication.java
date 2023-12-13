package c1541tjavareact.library;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

// Added for CORS
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class LibraryApplication {

	private final JdbcTemplate jdbcTemplate;

	@Value("classpath:scripts/inserts.sql")
	private Resource insertsSql;

	public LibraryApplication(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@PostConstruct
	public void executeInsertsSql() throws IOException {
		try {
			InputStreamReader reader = new InputStreamReader(insertsSql.getInputStream(), StandardCharsets.UTF_8);
			String sqlScript = FileCopyUtils.copyToString(reader);

			String[] sqlStatements = sqlScript.split(";");
			for (String sqlStatement : sqlStatements) {
				if (!sqlStatement.trim().isEmpty()) {
					jdbcTemplate.execute(sqlStatement);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
