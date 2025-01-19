package br.com.desafio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "br.com.desafio.domain")
public class CrudEventoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudEventoApplication.class, args);
	}

}
