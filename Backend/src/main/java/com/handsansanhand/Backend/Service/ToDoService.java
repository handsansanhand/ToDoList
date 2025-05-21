package com.handsansanhand.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.handsansanhand.Backend.Model.ToDoItem;
import com.handsansanhand.Backend.Model.User;
import com.handsansanhand.Backend.Repository.ToDoItemRepository;
import com.handsansanhand.Backend.Repository.UserRepository;

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
        public Optional<ToDoItem> addToDoItemByName(String userName, String title, String description) {
        Optional<User> userOpt = userRepository.findByName(userName); //locate the user

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
    //return all to do items for a user by name
    public List<ToDoItem> getToDoItemsForUserByName(String userName) {
    return toDoItemRepository.findByUserName(userName);
}
public List<ToDoItem> getToDoItemsForUserByNameAndCompleted(String userName, boolean completed) {
    return toDoItemRepository.findByUserNameAndCompleted(userName, completed);
}
    //return all to do items for a user
    public List<ToDoItem> getAllToDoItems() {
    return toDoItemRepository.findAll();
}

//method for marking a certain to do method as complete or incomplete
public Optional<ToDoItem> toggleCompleted(Long toDoItemId) {
 Optional<ToDoItem> itemOpt = toDoItemRepository.findById(toDoItemId);
    if (itemOpt.isEmpty()) {
        return Optional.empty();
    }
    ToDoItem item = itemOpt.get();
    item.setCompleted(!item.isCompleted());
    ToDoItem updatedItem = toDoItemRepository.save(item);
    return Optional.of(updatedItem);
}


    public boolean deleteTask(Long taskID) {
        if (toDoItemRepository.existsById(taskID)) {
            toDoItemRepository.deleteById(taskID);
            return true;
        }
        return false;
    }
    
    
}
