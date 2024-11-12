package com.basicTwitter.backend.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class SignupRequestDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Date birthDate;
    private String gender;

    public void setGender(String gender) {
        this.gender = gender;
    }
}
