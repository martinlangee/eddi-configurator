import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import All from "./components/All.jsx";
import Single from "./components/Single.jsx";

function App() {
  return (
    <Router>
      <div>
        <h2>Welcome to Martin's Poke Fight Page</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={"/"} className="nav-link">
            View All
          </Link>
        </nav>
        <hr />
      </div>
      <Routes>
        <Route path="/pokemon/:id" element={<Single />} />
        <Route exact path="/" element={<All />} />
      </Routes>
    </Router>
  );
}

export default App;
