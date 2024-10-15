import React, { useContext } from "react";
import MovieContext from "../MovieContext";
import { useNavigate } from "react-router-dom";

const DeleteMovie = () => {
  const { filtered, deleteMovie } = useContext(MovieContext); // Lấy dữ liệu và phương thức xóa
  const navigate = useNavigate();

  const handleDeleteMovie = (movieId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      deleteMovie(movieId);  // Xóa phim từ context
      alert("Phim đã được xóa thành công!");
      navigate("/"); // Điều hướng về trang chính sau khi xóa
    }
  };

  return (
    <div>
      <h1>Danh sách phim</h1>
      {filtered.length === 0 ? (
        <p>Không có phim để xóa</p>
      ) : (
        <div className="movies-list">
          {filtered.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "200px", cursor: "pointer", opacity: 0.7 }}
                onClick={() => handleDeleteMovie(movie.id)} // Xóa phim khi nhấn vào ảnh
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/")}>Quay lại trang chính</button>
    </div>
  );
};

export default DeleteMovie;
