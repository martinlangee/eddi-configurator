import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import UserWidgets from "./components/UserWidgets";
import UserScreens from "./components/UserScreens";
import UserSettings from "./components/UserSettings";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route path="/widgets" element={<UserWidgets />} />
        <Route path="/screens" element={<UserScreens />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
