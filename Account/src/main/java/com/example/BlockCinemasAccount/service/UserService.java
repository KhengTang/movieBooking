package com.example.BlockCinemasAccount.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BlockCinemasAccount.model.User;
import com.example.BlockCinemasAccount.repository.UserRepository;

import java.util.List;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUser(String id) {
        return userRepository.findById(id).get();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    
    public List<User> listAllUser() {
        return userRepository.findAll();
    }

}
