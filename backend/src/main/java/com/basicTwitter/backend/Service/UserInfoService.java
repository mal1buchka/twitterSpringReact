package com.basicTwitter.backend.Service;

import com.basicTwitter.backend.DAO.UserRepository;
import com.basicTwitter.backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    private final UserRepository userRepository;
    @Autowired
    public UserInfoService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public User getUserByUsername(String username){
        return userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found with username " + username));
    }
}
