import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./MovieContext";
import Panel from "./components/Panel";
import Container from "./components/Container";
import Details from "./components/Details";
import Register from "./components/Register";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie"; // Thêm import cho component thêm phim
import EditMovie from "./components/EditMovie"; // Thêm import cho component sửa phim
import DeleteMovie from "./components/DeleteMovie"; // Thêm import cho component xóa phim
import AdminRoute from "./components/AdminRoute"; // Import AdminRoute để bảo vệ các route cho admin

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes>
          <Route path="/" element={
            <>
              <Panel />
              <Container />
            </>
          } 
          />
          <Route path="/movie">
            <Route path=":movieId" element={<Details />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Sử dụng AdminRoute để bảo vệ các route dành cho admin */}
          <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/delete-movies" component={DeleteMovies} />
        </Switch>
          <Route path="/add-movie" element={<AdminRoute><AddMovie /></AdminRoute>} /> 
          <Route path="/edit-movie/:movieId" element={<AdminRoute><EditMovie /></AdminRoute>} /> 
          <Route path="/delete-movie/:movieId" element={<AdminRoute><DeleteMovie /></AdminRoute>} /> 
          <Route path="/delete-movie" element={<DeleteMovie />} />  {/* Route cho trang xóa phim */}
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
