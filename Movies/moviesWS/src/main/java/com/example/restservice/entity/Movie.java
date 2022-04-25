package com.example.restservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MOVIES_TBL")
public class Movie {
    
    @Id
    private String imdbId;

	private String title;

	private String year;
	
	private String rated;
	
	private String released;
	
	private String runtime;
	
	private String genre;
	
	private String director;
	
	private String writer;
	
	private String actors;
	
	private String plot;
	
	private String language;
	
	private String country;
	
	private String poster;
}