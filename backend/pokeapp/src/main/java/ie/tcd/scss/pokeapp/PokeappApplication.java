package ie.tcd.scss.pokeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PokeappApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokeappApplication.class, args);
		System.out.println("PokeApp is running!");
	}

}
