package com.example.BlockCinemasAccount.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BlockCinemasAccount.model.User;
import com.example.BlockCinemasAccount.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
    @Autowired
    UserService userService;

    @GetMapping("")
    public List<User> list() {
        return userService.listAllUser();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable String id) {
        try {
            User user = userService.getUser(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/")
    public void add(@RequestBody User user) {
        userService.saveUser(user);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable String id) {
        try {
            User existUser = userService.getUser(id);
            user.setUserId(id);            
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {

        userService.deleteUser(id);
    }
}
