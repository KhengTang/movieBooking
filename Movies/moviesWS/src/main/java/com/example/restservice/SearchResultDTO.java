package com.example.restservice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchResultDTO{
	
	@JsonProperty("Title")
	private String title;

	@JsonProperty("Year")
	private String year;
	
	@JsonProperty("imdbID")
	private String imdbID;

	@JsonProperty("Type")
	private String type;

	@JsonProperty("Poster")
	private String poster;

	/*public SearchResultDTO(){

	}

	public SearchResultDTO(String t, String yr, String id, String ty, String p){
		this.title = t;
		this.year = yr;
		this.imdbID = id;
		this.type = ty;
		this.poster = p;
	}*/

	public String getTitle(){
		return title;
	}
	public void setTitle(String t){
		this.title = t;
	}

	public String getYear(){
		return year;
	}
	public void setYear(String yr){
		this.year = yr;
	}

	public String getImdbID(){
		return imdbID;
	}
	public void setImdbID(String id){
		this.imdbID = id;
	}

	public String getType(){
		return type;
	}
	public void setType(String ty){
		this.type = ty;
	}

	public String getPoster(){
		return poster;
	}
	public void setPoster(String p){
		this.poster = p;
	}
}