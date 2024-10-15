import React, { useContext } from "react";
import { MovieContext } from "./MovieContext";

function MovieList() {
  const { movies, deleteMovie, isAdmin } = useContext(MovieContext);

  return (
    <div>
      <h1>Movies List</h1>
      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <p>{movie.title}</p>
              {isAdmin() && (
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
