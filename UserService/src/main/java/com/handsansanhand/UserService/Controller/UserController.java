package com.handsansanhand.UserService.Controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.handsansanhand.UserService.Model.User;
import com.handsansanhand.UserService.Service.UserService;



@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public static class UserRequest {
    public String name;
}
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
       return ResponseEntity.ok(userService.getAllUsers());
    }
    
     @GetMapping("/{userID}")
    public ResponseEntity<?> getUserByID(@RequestParam Long userID) {
        Optional<User> user = userService.getUserByID(userID);
        if(user.isEmpty()) {
            return ResponseEntity.badRequest().body("User " + userID + " does not exist.");
        }
       return ResponseEntity.ok(user);
    }
    

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody UserRequest request) {
        //TODO: process POST request
        if (request.name == null || request.name.isBlank()) {
            return ResponseEntity.badRequest().body("Name is required.");
        }
        Optional<User> newUser = userService.createUser(request.name);
        if(newUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User with the name " + request.name + " already exists.");
        }

        return ResponseEntity.ok("User " + request.name + " has been created.");
    }
    

    
}
