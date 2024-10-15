import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieContext from "../MovieContext";

const EditMovie = () => {
  const { movieId } = useParams();
  const { movies, editMovie } = useContext(MovieContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id === parseInt(movieId));
    setMovie(selectedMovie);
  }, [movieId, movies]);

  const handleEditMovie = () => {
    // Xử lý logic chỉnh sửa phim
    editMovie(movie);
    alert("Phim đã được chỉnh sửa thành công!");
    navigate("/");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Chỉnh sửa phim: {movie.title}</h2>
      {/* Form chỉnh sửa phim */}
      <button onClick={handleEditMovie}>Lưu</button>
    </div>
  );
};

export default EditMovie;
