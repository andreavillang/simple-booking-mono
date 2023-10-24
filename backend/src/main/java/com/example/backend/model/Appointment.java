package com.example.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Appointment(
        @Id Integer id,
        @NotBlank String name,
        @NotBlank String comments,
        @NotNull LocalDateTime schedule,
        @NotBlank String password
) {

}
