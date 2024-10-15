import React, { useState, useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import MovieContext from "../MovieContext";

const Search = () => {
  const [value, setValue] = useState("");
  const { fetchPopular, fetchSearch } = useContext(MovieContext);

  const onKeyUp = (event) => {
    if (event.key === "Enter" && value !== "") {
      const query = value.trim();
      if (query === "") {
        fetchPopular(); // Không cần kiểm tra lại đây, vì đã kiểm tra giá trị
      } else {
        fetchSearch(query);
      }
      setValue(""); // Đặt lại giá trị ô nhập
    }
  };

  return (
    <div className="search-movies">
      <label htmlFor="search">
        <RiSearchLine />
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search for movies"
        onKeyUp={onKeyUp} // Thay đổi từ onKeyDown sang onKeyUp
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
