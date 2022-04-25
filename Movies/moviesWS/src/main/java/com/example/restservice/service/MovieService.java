package com.example.restservice.service;

import com.example.restservice.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.restservice.entity.Movie;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository repository;

    //CREATE
    public Movie saveMovie(Movie movie){
        return repository.save(movie);
    }

    //RETRIEVE
    public List<Movie> getMovies(){
        return repository.findAll();
    }

    public Movie getMovie(String imdbId){
        return repository.getById(imdbId);
    }

    //DELETE
    public String deleteMovie(String imdbId){
        Movie m = getMovie(imdbId); 
        repository.deleteById(imdbId);

        return "movie removed || " + m.getTitle();
    }
}