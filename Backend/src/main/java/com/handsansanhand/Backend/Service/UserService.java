package com.handsansanhand.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.handsansanhand.Backend.Model.User;
import com.handsansanhand.Backend.Repository.UserRepository;

/*
 * Simple user service class which contains functionality for creating users and deleting them from the repository
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    //check to see if the user exists first
    public Optional<User> createUser(String name) {
        Optional<User> existingUser = userRepository.findByName(name);
        if(existingUser.isPresent()) {
            return Optional.empty();
        }
       User newUser = new User(name);
    User savedUser = userRepository.save(newUser);
    return Optional.of(savedUser);
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    
}
