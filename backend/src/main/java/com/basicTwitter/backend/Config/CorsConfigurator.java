package com.basicTwitter.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfigurator {

    @Bean
    public CorsFilter corsFilter() {
        // Создаем конфигурацию CORS
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173"); // Разрешаем конкретный origin (например, для фронтенда на localhost)
        config.addAllowedHeader("*"); // Разрешаем все заголовки
        config.addAllowedMethod("*"); // Разрешаем все HTTP-методы (GET, POST, PUT, DELETE и т.д.)

        // Применяем конфигурацию
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Применяем для всех путей

        return new CorsFilter(source);
    }
}

