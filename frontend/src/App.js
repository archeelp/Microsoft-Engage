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

import Home from "./pages/Home";
const Schedule = React.lazy(() => import("./pages/Schedule"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Course = React.lazy(() => import("./pages/Course"));
const JoinCourse = React.lazy(() => import("./components/JoinCourse"));
const Submission = React.lazy(() => import("./pages/Submission"));

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
        </Routes>
        <Suspense fallback={<Loader />}>
          <Routes>
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
            <Route
              path="/course/:courseId/assignment/:assignmentId"
              element={isAuthenticated ? <Submission /> : <Navigate to="/" />}
            />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
