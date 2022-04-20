package com.example.BlockCinemasAccount.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BlockCinemasAccount.model.User;

public interface UserRepository extends JpaRepository<User, String>{

}
