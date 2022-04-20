package com.example.BlockCinemasAccount.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BlockCinemasAccount.model.UserHistory;


public interface UserHistoryRepository extends JpaRepository<UserHistory, Long>{
	
	
	List<UserHistory> findByUserId(String userId);

}
