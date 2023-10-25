package com.example.backend.controller;

import com.example.backend.model.Appointment;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    // controllers accepts api requests and returns responses
    private final AppointmentRepository repository;
    private final AppointmentService service;

    public AppointmentController(AppointmentRepository repository, AppointmentService service) {
        this.repository = repository;
        this.service = service;
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
        LocalDateTime schedule = appointment.schedule();

        boolean isWholeHour = service.isWholeHour(schedule);
        boolean isValidDate = service.isScheduleAfterToday(schedule.toLocalDate());
        boolean noScheduleDuplicate = repository.findBySchedule(appointment.schedule()).isEmpty();

        if (isWholeHour && isValidDate && noScheduleDuplicate) {
            repository.save(appointment);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/update/{id}")
    public void update(@PathVariable Integer id, @Valid @RequestBody Appointment appointment) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        LocalDateTime requestSchedule = appointment.schedule();

        Optional<Appointment> currentAppt = repository.findById(id);
        int currentId = currentAppt.get().id();

        boolean passwordMatches = service.validatePassword(currentAppt, appointment.password());
        boolean isWholeHour = service.isWholeHour(requestSchedule);
        boolean isValidDate = service.isScheduleAfterToday(requestSchedule.toLocalDate());
        boolean noScheduleDuplicate = repository.findByScheduleIgnoreCurrentId(requestSchedule, currentId).isEmpty();

        if (passwordMatches) {
            if (isWholeHour && isValidDate && noScheduleDuplicate) {
                Appointment updatedAppt = new Appointment(currentId, appointment.name(), appointment.comments(), appointment.schedule(), appointment.password());
                repository.save(updatedAppt);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id, @RequestBody String password) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        LocalDateTime schedule = repository.findById(id).get().schedule();
        boolean isScheduleDone = service.isScheduleDone(schedule);
        boolean passwordMatches = service.validatePassword(repository.findById(id), password);

        if (passwordMatches) {
            if (isScheduleDone) {
                repository.deleteById(id);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
