package com.example.backend.controller;

import com.example.backend.model.Appointment;
import com.example.backend.repository.AppointmentRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    // controllers accepts api requests and returns responses
    private final AppointmentRepository repository;

    public AppointmentController(AppointmentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public List<Appointment> findAll() {
        return repository.findAllSortBySchedule();
    }

    @GetMapping("{id}")
    public Optional<Appointment> findById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create")
    public void create(@Valid @RequestBody Appointment appointment) {
        if (repository.findBySchedule(appointment.schedule()).isEmpty()) {
            repository.save(appointment);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An appointment with that schedule already existss");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/update/{id}")
    public void update(@PathVariable Integer id, @Valid @RequestBody Appointment appointment) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment to be updated wasn't found");
        }


        String requestPassword = appointment.password();
        LocalDateTime requestSchedule = appointment.schedule();

        Optional<Appointment> currentAppt = repository.findById(id);
        String currentPassword = currentAppt.get().password();
        int currentId = currentAppt.get().id();

        if (requestPassword.equals(currentPassword)) {
            if (repository.findByScheduleIgnoreCurrentId(requestSchedule, currentId).isEmpty()) {
                Appointment updatedAppt = new Appointment(currentId, appointment.name(), appointment.comments(), appointment.schedule(), appointment.password());
                repository.save(updatedAppt);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An appointment with that schedule already existss");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You've entered the wrong password");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id, @RequestBody String password) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment to be updated wasn't found");
        }

        String appointmentPassword = repository.findById(id).get().password();
        if (password.equals(appointmentPassword)) {
            repository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You've entered the wrong password");
        }
    }
}
