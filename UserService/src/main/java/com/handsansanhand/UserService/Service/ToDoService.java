package com.handsansanhand.UserService.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.handsansanhand.UserService.Model.ToDoItem;
import com.handsansanhand.UserService.Model.User;
import com.handsansanhand.UserService.Repository.ToDoItemRepository;
import com.handsansanhand.UserService.Repository.UserRepository;

/*  A simple service which updates the to_do items of a user, or returns a list of to_do items for a user
 */
@Service
public class ToDoService {
    private final ToDoItemRepository toDoItemRepository;
    private final UserRepository userRepository;

    public ToDoService(UserRepository userRepository, ToDoItemRepository toDoItemRepository) {
        this.toDoItemRepository = toDoItemRepository;
        this.userRepository = userRepository;
    }

    //adds a to_do item to a users to_do list
    public Optional<ToDoItem> addToDoItem(Long userID, String title, String description) {
        Optional<User> userOpt = userRepository.findById(userID); //locate the user

        if(userOpt.isEmpty()) {
            return Optional.empty();
        }
        //extract the user, create a new to do item, and store it
        User user = userOpt.get();
        ToDoItem newItem = new ToDoItem(title, description, false, user);
        ToDoItem savedItem = toDoItemRepository.save(newItem);
        return Optional.of(savedItem);
    }

    //return all to do items for a user
    public List<ToDoItem> getToDoItemsForUser(Long userID) {
    return toDoItemRepository.findByUserId(userID);
}

    
    
}
