package com.example.backend.repository;

import com.example.backend.model.Appointment;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends ListCrudRepository<Appointment,Integer> {

    @Query("""
        SELECT * FROM Appointment
        order by schedule asc
    """)
    List<Appointment> findAllSortBySchedule();

    Optional<Appointment> findBySchedule(LocalDateTime schedule);

    @Query("""
        SELECT * FROM Appointment
        where schedule = :schedule
        and id != :id
    """)
    Optional<Appointment> findByScheduleIgnoreCurrentId(@Param("schedule") LocalDateTime schedule, @Param("id") Integer id);
}
