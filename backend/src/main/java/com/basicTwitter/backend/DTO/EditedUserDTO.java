package com.basicTwitter.backend.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class EditedUserDTO {
    private Long id;
    private String username;
    private String email;
    private Date birthDate;
    private String gender;
}
