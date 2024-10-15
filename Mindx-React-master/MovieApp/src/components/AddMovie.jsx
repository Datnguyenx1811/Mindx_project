import React, { useState, useContext } from "react";
import MovieContext from "../MovieContext";

const AddMovie = () => {
  const { addMovie } = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddMovie = (e) => {
    e.preventDefault();
    const newMovie = { id: Date.now(), title, description }; // Giả sử id là timestamp
    addMovie(newMovie);
    alert("Phim đã được thêm thành công!");
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleAddMovie}>
      <input
        type="text"
        placeholder="Tên phim"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Mô tả phim"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Thêm phim</button>
    </form>
  );
};

export default AddMovie;
