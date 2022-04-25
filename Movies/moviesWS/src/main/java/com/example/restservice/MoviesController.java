package com.example.restservice;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.InputStream;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedInputStream;
import java.util.Scanner;
import java.io.IOException;

import com.example.restservice.SearchResultDTO;
import com.example.restservice.SearchResultListDTO;
import com.example.restservice.MovieDetailsDTO;

import com.example.restservice.entity.Movie;
import com.example.restservice.repository.MovieRepository;
import com.example.restservice.service.MovieService;

@RestController
public class MoviesController {

	private static final Logger LOGGER=LoggerFactory.getLogger(MoviesController.class);

	private String query_url = "https://www.omdbapi.com/?apikey=40c317d7&";
	
	private static final String typeAndTitle = "type=movie&s=";
	private static final String paramImdbID = "i=";
	private static final String paramPage = "&page=";

	@Autowired
	private MovieService service;

	/*
	*	Database-related
	*	> CRD operations 
	*/

	//CREATE
	@PostMapping("/addMovie")
	public Movie addMovie(@RequestBody Movie movie) {
		return service.saveMovie(movie);
	}

	//RETRIEVE
	@GetMapping("/movies")
	public List<Movie> findAllMovies(){
		return service.getMovies();
	}

	@GetMapping("/movie/{imdbId}")
	public Movie findMovieById(@PathVariable String imdbId){
		return service.getMovie(imdbId);
	}

	//DELETE
	@DeleteMapping("/removeMovie/{imdbId}")
	public String removeMovie(@PathVariable String imdbId) {
		return service.deleteMovie(imdbId);
	}
	

	/*
	*	omDB-related
	*	> details of movie (by movie imdbID) 
	*	> search (by movie title) and view list of movies
	*/
	//@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/movieDetails")
	public MovieDetailsDTO movieDetails(@RequestParam(value = "id") String id) throws IOException {

		//1: create params
		String searchImdbID = paramImdbID + id;

		String urlAndParams = query_url + searchImdbID;
		LOGGER.info("urlAndParams: " + urlAndParams);

		//2: setup http GET connection
		URL url = new URL(urlAndParams);

		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setDoOutput(true);

		//3: read the response
		MovieDetailsDTO mdsDTO = new MovieDetailsDTO();

		InputStream in = new BufferedInputStream(conn.getInputStream());
		String result = new Scanner(in, "UTF-8").useDelimiter("\\A").next();
		LOGGER.info("respondJSONstring: " + result);

		ObjectMapper mapper = new ObjectMapper();

		try {
			mdsDTO = mapper.readValue(result, MovieDetailsDTO.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// terminate inputstream
		in.close();

		// terminate the HTTP request
		conn.disconnect();
		return mdsDTO;
	}

	//@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/searchMovies")
	public SearchResultListDTO searchResultListPage(@RequestParam String title, @RequestParam(value = "page", defaultValue = "1") String page) throws IOException {

		//1: create params
		String searchMovieTitlePage = typeAndTitle + title + paramPage + page;

		String urlAndParams = query_url + searchMovieTitlePage;
		LOGGER.info("urlAndParams: " + urlAndParams);

		//2: setup http GET connection
		URL url = new URL(urlAndParams);

		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setDoOutput(true);

		//3: read the response
		SearchResultListDTO srlDTO = new SearchResultListDTO();

		InputStream in = new BufferedInputStream(conn.getInputStream());
		String result = new Scanner(in, "UTF-8").useDelimiter("\\A").next();
		LOGGER.info("respondJSONstring: " + result);

		ObjectMapper mapper = new ObjectMapper();

		try {
			srlDTO = mapper.readValue(result, SearchResultListDTO.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// terminate inputstream
		in.close();

		// terminate the HTTP request
		conn.disconnect();
		return srlDTO;
	}
}
