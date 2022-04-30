package com.example.BlockCinemasAccount.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.BlockCinemasAccount.model.UserLogin;
import com.example.BlockCinemasAccount.service.UserLoginService;


@RestController
@RequestMapping("/login")
public class UserLoginController {
	
    @Autowired
    UserLoginService userLoginService;

    @CrossOrigin(origins = "", allowedHeaders = "")
    @GetMapping("")
    public List<UserLogin> list() {
        return userLoginService.listAllUserLogin();
    }

    @CrossOrigin(origins = "", allowedHeaders = "")
    @GetMapping("/{id}")
    public ResponseEntity<UserLogin> get(@PathVariable String id) {
        try {
            UserLogin userLogin = userLoginService.getUserLogin(id);
            return new ResponseEntity<UserLogin>(userLogin, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<UserLogin>(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @PostMapping("/")
    public void add(@RequestBody UserLogin userLogin) {
    	userLoginService.saveUserLogin(userLogin);
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @PostMapping("/{id}")
    public ResponseEntity<UserLogin> login(@RequestBody UserLogin userLogin) {
    	try {
    		UserLogin existUserLogin = userLoginService.getUserLogin(userLogin.getUserId());
    		if(existUserLogin.getPassword().equals(userLogin.getPassword())) {
    			return new ResponseEntity<UserLogin>(HttpStatus.OK);
    		}
    		else {
    			return new ResponseEntity<UserLogin>(HttpStatus.EXPECTATION_FAILED);
    		}
    	} catch (NoSuchElementException e) {
            return new ResponseEntity<UserLogin>(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody UserLogin userLogin, @PathVariable String id) {
        try {
            UserLogin existUserLogin = userLoginService.getUserLogin(id);
            userLogin.setUserId(id);            
            userLoginService.saveUserLogin(userLogin);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @CrossOrigin(origins = "", allowedHeaders = "")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {

    	userLoginService.deleteUserLogin(id);
    }
}
