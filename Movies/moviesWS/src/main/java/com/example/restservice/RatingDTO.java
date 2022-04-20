package com.example.restservice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RatingDTO{
	
	@JsonProperty("Source")
	private String source;

	@JsonProperty("Value")
	private String value;

	public String getSource(){
		return source;
	}
	public void setSource(String source){
		this.source = source;
	}

	public String getValue(){
		return value;
	}
	public void setValue(String value){
		this.value = value;
	}
}