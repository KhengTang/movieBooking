package com.example.restservice;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.example.restservice.SearchResultDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SearchResultListDTO{
	
	@JsonProperty("Search")
	private List<SearchResultDTO> search = new ArrayList<>();
	
	@JsonProperty("totalResults")
	private int totalResults;

	@JsonProperty("Response")
	private boolean response;

	/*public SearchResultListDTO() {

	}

	public SearchResultListDTO(List<SearchResultDTO> s, int tr, boolean r){
		this.search = s;
		this.totalResults = tr;
		this.response = r;
	}*/

	public List<SearchResultDTO> getSearch(){
		return search;
	}
	public void setSearch(List<SearchResultDTO> s){
		this.search = s;
	}

	public int getTotalResults(){
		return totalResults;
	}
	public void setTotalResults(int tr){
		this.totalResults = tr;
	}

	public boolean getResponse(){
		return response;
	}
	public void setResponse(boolean r){
		this.response = r;
	}
}