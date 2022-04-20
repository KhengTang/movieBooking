package com.example.restservice;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.example.restservice.RatingDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDetailsDTO{
	
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

	@JsonProperty("Writer")
	private String writer;

	@JsonProperty("Actors")
	private String actors;

	@JsonProperty("Plot")
	private String plot;

	@JsonProperty("Language")
	private String language;

	@JsonProperty("Country")
	private String country;

	@JsonProperty("Awards")
	private String awards;

	@JsonProperty("Poster")
	private String poster;

	//ratings
	@JsonProperty("Ratings")
	private List<RatingDTO> ratings = new ArrayList<>();

	@JsonProperty("Metascore")
	private int metascore;

	@JsonProperty("imdbRating")
	private float imdbRating;

	@JsonProperty("imdbVotes")
	private String imdbVotes;

	@JsonProperty("imdbID")
	private String imdbId;

	@JsonProperty("Type")
	private String type;

	@JsonProperty("DVD")
	private String dvd;

	@JsonProperty("BoxOffice")
	private String boxOffice;

	@JsonProperty("Production")
	private String production;

	@JsonProperty("Website")
	private String website;

	@JsonProperty("Response")
	private boolean response;

	//Getters and Setters
	public String getTitle(){
		return title;
	}
	
	public void setTitle(String title){
		this.title = title;
	}

	public String getYear() {
		return this.year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getRated() {
		return this.rated;
	}

	public void setRated(String rated) {
		this.rated = rated;
	}

	public String getReleased() {
		return this.released;
	}

	public void setReleased(String released) {
		this.released = released;
	}

	public String getRuntime() {
		return this.runtime;
	}

	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}

	public String getGenre() {
		return this.genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getDirector() {
		return this.director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getWriter() {
		return this.writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getActors() {
		return this.actors;
	}

	public void setActors(String actors) {
		this.actors = actors;
	}

	public String getPlot() {
		return this.plot;
	}

	public void setPlot(String plot) {
		this.plot = plot;
	}

	public String getLanguage() {
		return this.language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAwards() {
		return this.awards;
	}

	public void setAwards(String awards) {
		this.awards = awards;
	}

	public String getPoster() {
		return this.poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	//ratings
	public List<RatingDTO> getRatings(){
		return ratings;
	}
	public void setRatings(List<RatingDTO> ratings){
		this.ratings = ratings;
	}

	public int getMetascore() {
		return this.metascore;
	}

	public void setMetascore(int metascore) {
		this.metascore = metascore;
	}

	public float getImdbRating() {
		return this.imdbRating;
	}

	public void setImdbRating(float imdbRating) {
		this.imdbRating = imdbRating;
	}

	public String getImdbVotes() {
		return this.imdbVotes;
	}

	public void setImdbVotes(String imdbVotes) {
		this.imdbVotes = imdbVotes;
	}

	public String getImdbId() {
		return this.imdbId;
	}

	public void setimdbId(String imdbId) {
		this.imdbId = imdbId;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDvd() {
		return this.dvd;
	}

	public void setDvd(String dvd) {
		this.dvd = dvd;
	}

	public String getBoxOffice() {
		return this.boxOffice;
	}

	public void setBoxOffice(String boxOffice) {
		this.boxOffice = boxOffice;
	}

	public String getProduction() {
		return this.production;
	}

	public void setProduction(String production) {
		this.production = production;
	}

	public String getWebsite() {
		return this.website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public boolean getResponse() {
		return this.response;
	}

	public void setResponse(boolean response) {
		this.response = response;
	}
}