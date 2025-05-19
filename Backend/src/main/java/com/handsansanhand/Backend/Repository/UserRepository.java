package com.handsansanhand.Backend.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.handsansanhand.Backend.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //returns a user by its name
    Optional<User> findByName(String name);
}