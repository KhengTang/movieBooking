package com.example.restservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MOVIES_TBL")
public class Movie {
    
    @Id
	@JsonProperty("imdbID")
    private String imdbId;

	@JsonProperty("Title")
	private String title;

	@JsonProperty("Year")
	private String year;
	
	@JsonProperty("Rated")
	private String rated;
	
	@JsonProperty("Released")
	private String released;
	
	@JsonProperty("Runtime")
	private String runtime;
	
	@JsonProperty("Genre")
	private String genre;
	
	@JsonProperty("Director")
	private String director;
	
	@JsonProperty("Write")
	private String writer;
	
	@JsonProperty("Actors")
	private String actors;
	
	@JsonProperty("Plot")
	private String plot;
	
	@JsonProperty("Language")
	private String language;
	
	@JsonProperty("Country")
	private String country;
	
	@JsonProperty("Poster")
	private String poster;
}