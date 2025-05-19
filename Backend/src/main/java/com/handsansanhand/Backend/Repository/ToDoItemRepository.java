package com.handsansanhand.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.handsansanhand.Backend.Model.ToDoItem;

@Repository
public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
    //finds all the to_do items by a certain user id
    List<ToDoItem> findByUserId(Long userId);
    List<ToDoItem> findByUserIdAndCompleted(Long userId, boolean completed);
}