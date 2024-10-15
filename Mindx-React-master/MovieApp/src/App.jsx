import "./App.css";
import { Routes, Route } from "react-router-dom";  // Ensure this import is correct
import { MovieProvider } from "./MovieContext";
import Panel from "./components/Panel";
import Container from "./components/Container";
import Details from "./components/Details";
import Register from "./components/Register";
import Login from "./components/Login";
import AddMovie from "./components/AddMovie"; // Import AddMovie
import EditMovie from "./components/EditMovie"; // Import EditMovie
import DeleteMovie from "./components/DeleteMovie"; // Import DeleteMovie
import AdminRoute from "./components/AdminRoute"; // Import AdminRoute
import MovieList from "./components/MoviesList"; // Import MovieList

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes> {/* Replaced Switch with Routes */}
          {/* Route chính */}
          <Route path="/" element={
            <>
              <Panel />
              <Container />
            </>
          } />

          {/* Route cho chi tiết phim */}
          <Route path="/movie">
            <Route path=":movieId" element={<Details />} />
          </Route>

          {/* Route cho trang đăng ký và đăng nhập */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin-protected routes */}
          <Route path="/add-movie" element={<AdminRoute><AddMovie /></AdminRoute>} />
          <Route path="/edit-movie/:movieId" element={<AdminRoute><EditMovie /></AdminRoute>} />
          <Route path="/delete-movie/:movieId" element={<AdminRoute><DeleteMovie /></AdminRoute>} />
          <Route path="/delete-movie" element={<AdminRoute><DeleteMovie /></AdminRoute>} /> 

          {/* Route cho MovieList */}
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
