package com.example.restservice;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;

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

@RestController
public class MoviesController {

	private static final Logger LOGGER=LoggerFactory.getLogger(MoviesController.class);

	private String query_url = "https://www.omdbapi.com/?apikey=40c317d7&";
	private static final String typeAndTitle = "type=movie&s=";
	private static final String paramImdbID = "i=";
	private static final String paramPage = "&page=";

	// SearchResultListDTO obj
	/*@GetMapping("/searchMovies")
	public SearchResultListDTO searchResultList(@RequestParam(value = "title") String title) throws IOException {

		//1: create params
		String searchMovieTitle = typeAndTitle + title;

		String urlAndParams = query_url + searchMovieTitle;
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
	}*/

	// SearchResultDTO obj
	/*@GetMapping("/searchMovies")
	public List<SearchResultDTO> searchResultList(@RequestParam String title) throws IOException {

		//1: create params
		String searchMovieTitle = typeAndTitle + title;

		String urlAndParams = query_url + searchMovieTitle;
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
		return srlDTO.getSearch();
	}*/

	// movieDetailsDTO obj
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

	// SearchResultListDTO obj w/ Pagination
	@GetMapping("/searchMoviesPage")
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
