package com.basicTwitter.backend.DAO;

import com.basicTwitter.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
    Boolean existsUserByUsername(String username);
    Boolean existsUserByEmail(String email);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.username = :username, u.email = :email, u.birthDate = :birthDate, u.gender = :gender WHERE u.id = :id")
    void updateUser(Long id, String username, String email, Date birthDate, String gender);

}
