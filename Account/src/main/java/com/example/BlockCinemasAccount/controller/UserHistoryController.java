package com.example.BlockCinemasAccount.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BlockCinemasAccount.model.UserHistory;
import com.example.BlockCinemasAccount.service.UserHistoryService;

@RestController
@RequestMapping("/history")
public class UserHistoryController {
	
    @Autowired
    UserHistoryService userHistoryService;

    @CrossOrigin(origins = "", allowedHeaders = "")
    @GetMapping("")
    public List<UserHistory> list() {
        return userHistoryService.listAllUserHistory();
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @GetMapping("/{id}")
    public List<UserHistory> getUserHistoryByUserId(@PathVariable String id) {
    	return userHistoryService.listAllUserHistoryByUserId(id);
    }

    @CrossOrigin(origins = "", allowedHeaders = "")
    @GetMapping("/id/{id}")
    public ResponseEntity<UserHistory> get(@PathVariable Long id) {
        try {
            UserHistory userHistory = userHistoryService.getUserHistory(id);
            return new ResponseEntity<UserHistory>(userHistory, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<UserHistory>(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @PostMapping("/")
    public void add(@RequestBody UserHistory userHistory) {
    	userHistoryService.saveUserHistory(userHistory);
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody UserHistory userHistory, @PathVariable Long id) {
        try {
            UserHistory existUserHistory = userHistoryService.getUserHistory(id);
            userHistory.setId(id);            
            userHistoryService.saveUserHistory(userHistory);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

    	userHistoryService.deleteUserHistory(id);
    }
}
