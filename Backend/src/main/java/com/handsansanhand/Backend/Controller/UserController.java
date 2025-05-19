package com.handsansanhand.Backend.Controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handsansanhand.Backend.Model.User;
import com.handsansanhand.Backend.Service.UserService;



@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public static class UserRequest {
    public String name;
    public String password;
}
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
       return ResponseEntity.ok(userService.getAllUsers());
    }
    
     @GetMapping("/id/{userID}")
    public ResponseEntity<?> getUserByID(@PathVariable Long userID) {
        Optional<User> user = userService.getUserByID(userID);
        if(user.isEmpty()) {
            return ResponseEntity.badRequest().body("User " + userID + " does not exist.");
        }
       return ResponseEntity.ok(user);
    }

    //check if its a valid user, needs to 1) check the user exists 2) check if the password matches
    @GetMapping("/user")
    public ResponseEntity<?> getUserByName(@RequestBody UserRequest request) {
        Optional<User> user = userService.getUserByUsername(request.name);
        if(user.isEmpty()) {
            return ResponseEntity.badRequest().body("User " + request.name + " does not exist.");
        }
        boolean matches = userService.passwordMatches(user.get().getName(), request.password);
        if(!matches) {
            return ResponseEntity.badRequest().body("Invalid Password, please try again.");
        }
       return ResponseEntity.ok(user);
    }

    //check if its a valid user, needs to 1) check the user exists 2) check if the password matches
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserRequest request) {
        Optional<User> user = userService.getUserByUsername(request.name);
        if(user.isEmpty()) {
            return ResponseEntity.badRequest().body("User " + request.name + " does not exist.");
        }
        boolean matches = userService.passwordMatches(request.password, user.get().getPassword());
        System.out.println("user password " + user.get().getPassword() + " for user " + user.get().getName());
        System.out.println(request.password);
        System.out.println(userService.hashedPassword(request.password));
        System.out.println("These passwords match: " + matches);
        if(!matches) {
            return ResponseEntity.badRequest().body("Invalid Password, please try again.");
        }
       return ResponseEntity.ok(user);
    }
    

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody UserRequest request) {
        //TODO: process POST request
        if (request.name == null || request.name.isBlank()) {
            return ResponseEntity.badRequest().body("Name is required.");
        }
        Optional<User> newUser = userService.createUser(request.name, request.password);
        if(newUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User with the name " + request.name + " already exists.");
        }

        return ResponseEntity.ok("User " + request.name + " has been created.");
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<?> deleteUserByID(@PathVariable Long userID) {
         if(userService.deleteUser(userID)) {
            return ResponseEntity.ok("User " + userID + " has been deleted.");
         }
         return ResponseEntity.ok("User cannot be deleted, it does not exist.");
    }
    

    
}
