package com.example.BlockCinemasAccount.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

  @Id
  private String userId;
  private String firstName;
  private String lastName;
  private String hpNo;
  private String email;
  private String acType;

  protected User() {}

  public User(String userId, String firstName, String lastName, String hpNo, String email, String acType) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hpNo = hpNo;
    this.email = email;
    this.acType = acType;
  }

  @Override
  public String toString() {
    return String.format(
        "User[userId=%s, firstName='%s', lastName='%s', hpNo='%s', email='%s', acType='%s']",
        userId, firstName, lastName, hpNo, email, acType);
  }

	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getHpNo() {
		return hpNo;
	}
	
	public void setHpNo(String hpNo) {
		this.hpNo = hpNo;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getAcType() {
		return acType;
	}
	
	public void setAcType(String acType) {
		this.acType = acType;
	}
  

  
}