package com.example.BlockCinemasAccount.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BlockCinemasAccount.model.UserLogin;
import com.example.BlockCinemasAccount.repository.UserLoginRepository;

import java.util.List;

@Service
@Transactional
public class UserLoginService {
	
	@Autowired
	private UserLoginRepository userLoginRepository;
	
    public void saveUserLogin(UserLogin userLogin) {
    	userLoginRepository.save(userLogin);
    }

    public UserLogin getUserLogin(String id) {
        return userLoginRepository.findById(id).get();
    }

    public void deleteUserLogin(String id) {
    	userLoginRepository.deleteById(id);
    }
    
    public List<UserLogin> listAllUserLogin() {
        return userLoginRepository.findAll();
    }

}
