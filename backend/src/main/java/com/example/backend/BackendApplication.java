package com.example.backend;

import com.example.backend.model.Appointment;
import com.example.backend.repository.AppointmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


	@Bean
	CommandLineRunner commandLineRunner(AppointmentRepository repository) {
		return args -> {
			// ZoneId zoneId = ZoneId.of( "Asia/Singapore" );
			// LocalDateTime today = LocalDateTime.of(2023,11,20,9,0,0,0);

			// executes code after app context created but before app runs
			// add some data
			repository.save(new Appointment(null, "Andrea Ang", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,20,9,0,0,0), "1234"));
			repository.save(new Appointment(null, "Anton Ang", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,20,10,0,0,0), "1234"));
			repository.save(new Appointment(null, "Lucas Santos", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,21,11,0,0,0), "abcd"));
			repository.save(new Appointment(null, "Veronica Tiu", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,21,13,0,0,0), "abcd"));
			repository.save(new Appointment(null, "Elisa Uy", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,21,14,0,0,0), "1234"));
			repository.save(new Appointment(null, "Genesis Gaspar", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,22,16,0,0,0), "1234"));
			repository.save(new Appointment(null, "Mico Aquino", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,23,9,0,0,0), "abcd"));
			repository.save(new Appointment(null, "Jay Kay", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,23,8,0,0,0), "abcd"));
			repository.save(new Appointment(null, "Carly Rae Jepsen", "Mandatory annual physical examination from workplace", LocalDateTime.of(2023,11,24,8,0,0,0), "1234"));
		};
	}

}
