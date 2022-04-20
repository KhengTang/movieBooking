package com.example.BlockCinemasAccount.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.BlockCinemasAccount.model.UserHistory;
import com.example.BlockCinemasAccount.repository.UserHistoryRepository;

import java.util.List;

@Service
@Transactional
public class UserHistoryService {
	
	@Autowired
	private UserHistoryRepository userHistoryRepository;
	
    public void saveUserHistory(UserHistory userHistory) {
    	userHistoryRepository.save(userHistory);
    }

    public UserHistory getUserHistory(Long id) {
        return userHistoryRepository.findById(id).get();
    }

    public void deleteUserHistory(Long id) {
    	userHistoryRepository.deleteById(id);
    }
    
    public List<UserHistory> listAllUserHistory() {
        return userHistoryRepository.findAll();
    }
    
    public List<UserHistory> listAllUserHistoryByUserId(String userId) {
    	return userHistoryRepository.findByUserId(userId);
    }

}
