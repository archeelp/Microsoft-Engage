import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { isLoggedIn } from "./utils/token";
import Schedule from "./pages/Student/Schedule";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
