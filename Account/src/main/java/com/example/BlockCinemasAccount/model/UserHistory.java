package com.example.BlockCinemasAccount.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class UserHistory {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String userId;
  private String bookingId;
  private String movieId;
  private String theaterId;
  private String paymentId;
  @JsonFormat(pattern="dd-MM-yyyy")
  private Date bookingDt;

  protected UserHistory() {}

  public UserHistory(String userId, String bookingId, String movieId, String theaterId, String paymentId, Date bookingDt) {
    this.userId = userId;
    this.bookingId = bookingId;
    this.movieId = movieId;
    this.theaterId = theaterId;
    this.paymentId = paymentId;
    this.bookingDt = bookingDt;
  }

  @Override
  public String toString() {
    return String.format(
        "UserHistory[id=%d, userId='%s', bookingId='%s', movieId='%s', theaterId='%s', paymentId='%s', bookingDt='%t']",
        id, userId, bookingId, movieId, theaterId, paymentId, bookingDt);
  }

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getBookingId() {
		return bookingId;
	}
	
	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}
	
	public String getMovieId() {
		return movieId;
	}
	
	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}
	
	public String getTheaterId() {
		return theaterId;
	}
	
	public void setTheaterId(String theaterId) {
		this.theaterId = theaterId;
	}
	
	public String getPaymentId() {
		return paymentId;
	}
	
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	
	public Date getBookingDt() {
		return bookingDt;
	}
	
	public void setBookingDt(Date bookingDt) {
		this.bookingDt = bookingDt;
	}


}