package com.example.backend.service;

import com.example.backend.model.Appointment;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class AppointmentService {
    public boolean isScheduleAfterToday(LocalDate schedule) {
        LocalDate dateToday = LocalDate.now(ZoneId.of( "Asia/Singapore" ));

        return schedule.isAfter(dateToday);
    }

    public boolean isWholeHour(LocalDateTime schedule) {
        LocalDate dateToday = LocalDate.now(ZoneId.of( "Asia/Singapore" ));

        return schedule.getMinute() == 0 && schedule.getSecond() == 0 && schedule.getNano() == 0;
    }

    public boolean validatePassword(Optional<Appointment> appointment, String password) {
        if (appointment.isEmpty()) {
            return false;
        } else {
            String currentPassword = appointment.get().password();
            return password.equals(currentPassword);
        }
    }
}
