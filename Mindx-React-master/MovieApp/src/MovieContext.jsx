import React, { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "./UseLocalStorage";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);  // Danh sách phim
  const [filtered, setFiltered] = useState([]);  // Danh sách phim đã lọc
  const [activeGenre, setActiveGenre] = useState(0);  // Thể loại phim hiện tại
  const [header, setHeader] = useState("Trending");  // Tiêu đề trang hiện tại

  // localStorage state
  const [favourites, setFavourites] = useLocalStorage("fav", []);  // Yêu thích
  const [users, setUsers] = useLocalStorage("users", [
    { username: "admin", password: "admin", role: "admin" },  // Admin mặc định
  ]);
  const [user, setUser] = useLocalStorage("user", null);  // Người dùng hiện tại

  // Fetch data from API
  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1"
    );
    const movies = await data.json();
    setMovies(movies.results);
    setFiltered(movies.results);
    setHeader("Trending");
    setActiveGenre(0);
  };

  const fetchNowPlaying = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1"
    );
    const movies = await data.json();
    setMovies(movies.results);
    setFiltered(movies.results);
    setHeader("Now Playing");
    setActiveGenre(0);
  };

  const fetchTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1"
    );
    const movies = await data.json();
    setMovies(movies.results);
    setFiltered(movies.results);
    setHeader("Top Rated");
    setActiveGenre(0);
  };

  const fetchUpcoming = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1"
    );
    const movies = await data.json();
    setMovies(movies.results);
    setFiltered(movies.results);
    setHeader("Upcoming Movies");
    setActiveGenre(0);
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&query=${query}`
    );
    const movies = await data.json();
    setMovies(movies.results);
    setFiltered(movies.results);
    setHeader(`Search results for: ${query}`);
    setActiveGenre(0);
  };

  // Favourite logic
  const addToFavourites = (movie) => {
    let isOnArray = favourites.some((fav) => fav.id === movie.id);
    if (isOnArray) {
      setFavourites(favourites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavourites((prevState) => [...prevState, movie]);
    }
  };

  const getFavourites = () => {
    setMovies(favourites);
    setFiltered(favourites);
    setHeader("Your favourites");
    setActiveGenre(0);
  };

  const isFav = (id) => {
    return favourites.some((fav) => fav.id === id);
  };

  // Login and Registration
  const login = (username, password) => {
    const existingUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (newUser) => {
    const existingUser = users.find(
      (user) => user.username === newUser.username
    );
    if (!existingUser) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return true;
    } else {
      return false;
    }
  };

  // Movie management for admin
  const addMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
    setFiltered((prevMovies) => [...prevMovies, newMovie]);  // Update filtered list
  };

  const editMovie = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const deleteMovie = (movieId) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.filter((movie) => movie.id !== movieId);
      setFiltered(updatedMovies);  // Update filtered list to exclude deleted movie
      return updatedMovies;
    });
  };

  // Check if current user is admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  // Fetch popular movies when component mounts
  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        header,
        setHeader,
        addToFavourites,
        filtered,
        setFiltered,
        fetchPopular,
        fetchNowPlaying,
        fetchTopRated,
        fetchUpcoming,
        fetchSearch,
        movies,
        setMovies,
        activeGenre,
        setActiveGenre,
        getFavourites,
        isFav,
        user,
        setUsers,
        login,
        logout,
        register,
        addMovie,
        editMovie,
        deleteMovie,
        isAdmin,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
