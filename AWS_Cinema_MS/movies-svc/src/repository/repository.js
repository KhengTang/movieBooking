"use strict";

const repository = (db) => {
  const cinemaDB = db.db("cinemas");
  const moviesCollection = cinemaDB.collection("movies");

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const movies = [];
      const cursor = moviesCollection.find({}, { title: 1, id: 1 });
      const addMovie = (movie) => {
        movies.push(movie);
      };
      const sendMovies = (err) => {
        if (err) {
          reject(
            new Error("An error occurred fetching all movies, err:" + err)
          );
        }
        resolve(movies.slice());
      };
      cursor.forEach(addMovie, sendMovies);
    });
  };

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = [];
      const currentDay = new Date();
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear(),
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2,
        },
        releaseDay: {
          $lte: currentDay.getDate(),
        },
      };
      const cursor = moviesCollection.find(query);
      const addMovie = (movie) => {
        movies.push(movie);
      };
      const sendMovies = (err) => {
        if (err) {
          reject(
            new Error("An error occurred fetching all movies, err:" + err)
          );
        }
        resolve(movies);
      };
      cursor.forEach(addMovie, sendMovies);
    });
  };

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 };
      const sendMovie = (err, movie) => {
        if (err) {
          reject(
            new Error(
              `An error occurred fetching a movie with id: ${id}, err: ${err}`
            )
          );
        }
        resolve(movie);
      };
      moviesCollection.findOne({ id: id }, projection, sendMovie);
    });
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect,
  });
};

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("connection db not supplied!"));
    }
    resolve(repository(connection));
  });
};

module.exports = Object.assign({}, { connect });
