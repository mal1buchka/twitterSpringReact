package com.basicTwitter.backend.Controller;

import com.basicTwitter.backend.DAO.UserRepository;
import com.basicTwitter.backend.DTO.SigninRequestDTO;
import com.basicTwitter.backend.DTO.SignupRequestDTO;
import com.basicTwitter.backend.Model.User;
import com.basicTwitter.backend.Security.JwtCore;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/auth")
public class SecurityController {
        private UserRepository userRepository;
        private PasswordEncoder passwordEncoder;
        private AuthenticationManager authenticationManager;
        private JwtCore jwtCore;

        @Autowired
        public SecurityController(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtCore jwtCore){
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.authenticationManager = authenticationManager;
            this.jwtCore = jwtCore;
        }

        @PostMapping("/signup")
        ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequestDTO){

            if(userRepository.existsUserByUsername(signupRequestDTO.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Choose different name");
            }
            if(userRepository.existsUserByEmail(signupRequestDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Choose another email");
            }
            String hashed = passwordEncoder.encode(signupRequestDTO.getPassword());
            User user = new User();
            user.setUsername(signupRequestDTO.getUsername());
            user.setEmail(signupRequestDTO.getEmail());
            user.setBirthDate(signupRequestDTO.getBirthDate());
            user.setGender(signupRequestDTO.getGender());
            user.setPassword(hashed);
            userRepository.save(user);
            String token = jwtCore.generateToken(authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signupRequestDTO.getUsername(),
                            signupRequestDTO.getPassword()
                    )
            ));

            return ResponseEntity.ok(Map.of("token", token));
        }

        @PostMapping("/signin")
        ResponseEntity<?> signin(@RequestBody SigninRequestDTO signinRequestDTO){
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                signinRequestDTO.getUsername(),
                                signinRequestDTO.getPassword()
                        )
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String token = jwtCore.generateToken(authentication);
                return ResponseEntity.ok(Map.of("token", token));

            } catch (BadCredentialsException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            } catch (Exception e) {
                // Log any other exception
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Signin error");
            }
        }
}
