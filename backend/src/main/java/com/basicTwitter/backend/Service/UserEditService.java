package com.basicTwitter.backend.Service;

import com.basicTwitter.backend.DAO.UserRepository;
import com.basicTwitter.backend.DTO.EditedUserDTO;
import com.basicTwitter.backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserEditService {
    private final UserRepository userRepository;
    @Autowired
    public UserEditService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public User updateUserService(EditedUserDTO editedUserDTO) {
        userRepository.updateUser(
                editedUserDTO.getId(),
                editedUserDTO.getUsername(),
                editedUserDTO.getEmail(),
                editedUserDTO.getBirthDate(),
                editedUserDTO.getGender()
        );
        return userRepository.findById(editedUserDTO.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }

}
