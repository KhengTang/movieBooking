package com.example.BlockCinemasAccount.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BlockCinemasAccount.model.UserLogin;

public interface UserLoginRepository extends JpaRepository<UserLogin, String>{

}
