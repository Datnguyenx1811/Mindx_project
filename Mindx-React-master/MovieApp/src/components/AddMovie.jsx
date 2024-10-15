import React, { useState, useContext } from "react";
import MovieContext from "../MovieContext";

const AddMovie = () => {
  const { addMovie } = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");  // Để lưu URL hình ảnh

  const handleAddMovie = (e) => {
    e.preventDefault();

    if (!title || !description || !poster) {
      alert("Vui lòng nhập đầy đủ thông tin phim!");
      return;
    }

    const newMovie = {
      id: Date.now(),  // Tạo id duy nhất cho phim
      title,
      description,
      poster_path: poster,  // Thêm thông tin poster (URL)
    };

    addMovie(newMovie);  // Gọi addMovie từ MovieContext
    alert("Phim đã được thêm thành công!");

    // Reset form
    setTitle("");
    setDescription("");
    setPoster("");
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
      <input
        type="text"
        placeholder="URL hình ảnh"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        required
      />
      <button type="submit">Thêm phim</button>
    </form>
  );
};

export default AddMovie;
