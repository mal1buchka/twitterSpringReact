package com.basicTwitter.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonBackReference // Это предотвратит рекурсию с этой стороны связи
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @JsonBackReference // И для user, чтобы избежать бесконечного цикла
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
