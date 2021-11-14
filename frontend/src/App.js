import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import { isLoggedIn } from "./utils/token";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const Schedule = React.lazy(() => import("./pages/Schedule"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Course = React.lazy(() => import("./pages/Course"));
const JoinCourse = React.lazy(() => import("./components/JoinCourse"));

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
              <Suspense fallback={<Loader/>}>
                <Home
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              </Suspense>
            }
          />
          <Route
            path="/schedule"
            exact
            element={
              isAuthenticated ? 
              <Suspense fallback={<Loader/>}>
                <Schedule />
              </Suspense>
              : <Navigate to="/" />
            }
          />
          <Route
            path="/profile"
            exact
            element={
              isAuthenticated ? 
              <Suspense fallback={<Loader/>}>
                <Profile />
              </Suspense>
              : <Navigate to="/" />
            }
          />
          <Route
            path="/course"
            exact
            element={
              isAuthenticated ? 
              <Suspense fallback={<Loader/>}>
                <Courses />
              </Suspense>
              : <Navigate to="/" />
            }
          />
          <Route path="/course/join/:courseId" element={
              <Suspense fallback={<Loader/>}>
                <JoinCourse />
              </Suspense>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              isAuthenticated ? 
              <Suspense fallback={<Loader/>}>
                <Course />
              </Suspense>
              : <Navigate to="/" />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
