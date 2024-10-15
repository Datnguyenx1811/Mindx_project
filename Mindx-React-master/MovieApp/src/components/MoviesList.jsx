import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import MovieContext from "../MovieContext"; // Default import

function MovieList() {
  const { movies, deleteMovie, isAdmin } = useContext(MovieContext);

  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Display movie poster and link to movie details */}
                {movie.poster_path && (
                  <Link
                    to={`/movie/${movie.id}`}
                    style={{ textDecoration: "none", marginRight: "20px" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        width: "100px",
                        height: "150px",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    />
                  </Link>
                )}

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* Display movie title */}
                  <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {movie.title}
                  </p>

                  {/* If user is admin, display delete button */}
                  {isAdmin() && (
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ff3b30",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
