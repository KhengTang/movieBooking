package com.example.BlockCinemasAccount.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class UserLogin {

  @Id
  private String userId;
  private String password;
  @JsonFormat(pattern="dd-MM-yyyy")
  private Date lastLoginDt;

  protected UserLogin() {}

  public UserLogin(String userId, String password, Date lastLoginDt) {
    this.userId = userId;
    this.password = password;
    this.lastLoginDt = lastLoginDt;
  }

  @Override
  public String toString() {
    return String.format(
        "UserLogin[userId=%s, password='%s', lastLoginDt='%t']",
        userId, password, lastLoginDt);
  }

	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Date getLastLoginDt() {
		return lastLoginDt;
	}
	
	public void setLastLoginDt(Date lastLoginDt) {
		this.lastLoginDt = lastLoginDt;
	}

}