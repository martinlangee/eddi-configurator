import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserWidgets from "./components/UserWidgets";
import UserScreens from "./components/UserScreens";
import UserAccount from "./components/UserAccount";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/widgets" element={<UserWidgets />} />
        <Route path="/screens" element={<UserScreens />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
