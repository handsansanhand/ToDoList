package com.handsansanhand.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.handsansanhand.Backend.Model.User;
import com.handsansanhand.Backend.Repository.UserRepository;

/*
 * Simple user service class which contains functionality for creating users and deleting them from the repository
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Long> getUserIdByUsername(String username) {
    Optional<User> user = userRepository.findByName(username);
    return user.map(User::getId);
    }

        public Optional<User> getUserByID(Long userID) {
      return userRepository.findById(userID);
    }
        public Optional<User> getUserByUsername(String username) {
    return userRepository.findByName(username);
    }
    
    
    //check to see if the user exists first, if so return empty
    public Optional<User> createUser(String name, String password) {
        Optional<User> existingUser = userRepository.findByName(name);
        if(existingUser.isPresent()) {
            return Optional.empty();
        }
        //hash the password and store a new user
        String hashedPassword = passwordEncoder.encode(password);
       User newUser = new User(name, hashedPassword);
    User savedUser = userRepository.save(newUser);
    return Optional.of(savedUser);
    }

    public String hashedPassword(String pass) {
        return passwordEncoder.encode(pass);
    }

    public boolean passwordMatches(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    
}
