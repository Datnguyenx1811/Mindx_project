import React, { useState, useContext } from "react";
import MovieContext from "../MovieContext";

const Register = () => {
  const { setUsers } = useContext(MovieContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Mặc định là user

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem("users") || "[]").find((user) => user.username === username);
    if (existingUser) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    const newUser = { username, password, role };
    setUsers((prevUsers) => [...prevUsers, newUser]); // Cập nhật danh sách người dùng trong localStorage
    alert("Đăng ký thành công!");

    // Reset các trường input
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleRegister}>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Người dùng</option>
        <option value="admin">Quản trị viên</option>
      </select>
      <button type="submit">Đăng ký</button>
    </form>
  );
};

export default Register;
