package com.example.backend.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Appointment(@Id Integer id, String name, String comments, LocalDateTime schedule) {

}
