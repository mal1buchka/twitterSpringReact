package com.basicTwitter.backend.Controller;

import com.basicTwitter.backend.DTO.EditedUserDTO;
import com.basicTwitter.backend.Model.User;
import com.basicTwitter.backend.Service.UserEditService;
import com.basicTwitter.backend.Service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/secured")
public class MainController {
    private final UserInfoService userInfoService;
    private final UserEditService userEditService;
    @Autowired
    public MainController(UserInfoService userInfoService, UserEditService userEditService) {
        this.userInfoService = userInfoService;
        this.userEditService = userEditService;
    }
    @GetMapping("/user")
    public ResponseEntity<User> getUser(Principal principal) {
        if (principal == null) throw new RuntimeException("Error no info");
        User user = userInfoService.getUserByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }
    @PatchMapping("/editUser")
    public ResponseEntity<User> editUser(@RequestBody EditedUserDTO editedUserDTO) {
        try {
            User updatedUser = userEditService.updateUserService(editedUserDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
