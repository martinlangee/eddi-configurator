import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserWidgets from "./components/UserWidgets";
import UserScreens from "./components/UserScreens";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/widgets" element={<UserWidgets />} />
        <Route path="/screens" element={<UserScreens />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
