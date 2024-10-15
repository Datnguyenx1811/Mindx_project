import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import MovieContext from "../MovieContext";

const Login = () => {
  const { login, user } = useContext(MovieContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/"); // Điều hướng về trang chính sau khi đăng nhập
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default Login;
