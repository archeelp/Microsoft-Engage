import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { isLoggedIn } from "./utils/token";
import Schedule from "./pages/Schedule";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import JoinCourse from "./components/JoinCourse";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    if (isLoggedIn()) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/schedule"
            exact
            element={isAuthenticated ? <Schedule /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            exact
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/course"
            exact
            element={isAuthenticated ? <Courses /> : <Navigate to="/" />}
          />
          <Route path="/course/join/:courseId" element={<JoinCourse />} />
          <Route
            path="/course/:courseId"
            element={isAuthenticated ? <Course /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
