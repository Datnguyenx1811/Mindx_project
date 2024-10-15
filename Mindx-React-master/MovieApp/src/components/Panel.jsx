import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMovieFilter } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import MovieContext from "../MovieContext";

const Panel = () => {
  const {
    header,
    fetchPopular,
    fetchNowPlaying,
    fetchTopRated,
    fetchUpcoming,
    getFavourites,
    user,
    logout, // Đừng quên import logout
  } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <div className="panel">
      <div>
        <MdOutlineMovieFilter onClick={fetchPopular} className={header === "Trending" ? "active" : null} />
        <BiMoviePlay onClick={fetchNowPlaying} className={header === "Now playing" ? "active" : null} />
        <BsStars onClick={fetchTopRated} className={header === "Top rated" ? "active" : null} />
        <BiCameraMovie onClick={fetchUpcoming} className={header === "Upcoming" ? "active" : null} />
      </div>
      <div>
        <AiOutlineStar onClick={getFavourites} className={header === "Your favourites" ? "active" : null} />
        {!user ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <>
            <span>{`Xin chào, ${user.username}`}</span>
            {user.role === "admin" && (
              <>
                <button onClick={() => navigate("/add-movie")}>Thêm phim</button>
                <button onClick={() => navigate("/edit-movie")}>Sửa phim</button>
                <button onClick={() => navigate("/delete-movie")}>Xóa phim</button>
              </>
            )}
            <button onClick={logout}>Logout</button> {/* Nút Đăng xuất */}
          </>
        )}
      </div>
    </div>
  );
};

export default Panel;
