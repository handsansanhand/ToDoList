package com.handsansanhand.UserService.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.handsansanhand.UserService.Model.ToDoItem;
import com.handsansanhand.UserService.Service.ToDoService;



/*
 * Simple rest controller which is 
 */
@RestController
@RequestMapping("/todo/{userID}")
public class ToDoController {
    private final ToDoService toDoService;

    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }
    // DTO for request body
    public static class ToDoRequest {
        public String title;
        public String description;
    }

    //to do request will be a json which is automatically converted using jackson
    @PostMapping
    public ResponseEntity<?> addToDoItem(@PathVariable Long userID, @RequestBody ToDoRequest request) {
        //TODO: process POST request
            if (request.title == null || request.title.isBlank()) {
        return ResponseEntity.badRequest().body("Title is required.");
    }   
      Optional<ToDoItem> newItem = toDoService.addToDoItem(userID, request.title, request.description);

        if (newItem.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found.");
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(newItem.get());
    }

    //get request will return a list of to do objects for a given user
    @GetMapping
    public ResponseEntity<?> getAllToDoItems(@PathVariable Long userID) {
        List<ToDoItem> items = toDoService.getToDoItemsForUser(userID);

        if(items.isEmpty()) {
            return ResponseEntity.badRequest().body("No items for the user " + userID);
        }

        return ResponseEntity.ok(items);
    }
    
    
}
