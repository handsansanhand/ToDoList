package com.handsansanhand.Backend.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/*representation of a user which will be stored in the database
Each user will have an:
ID - incremental unique value
Name - the user name
List of todo items - multiple to do items associated with this user
*/
@Entity
@Table(name="usertable")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ToDoItem> todoItems;
    
    public User() {} // needed by JPA

    public User(String name) {
        this.name = name;
    }

      public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ToDoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<ToDoItem> todoItems) {
        this.todoItems = todoItems;
    }

}

