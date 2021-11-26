import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import Toggle from "../Toggle/Toggle";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const darkMode = useDarkMode(false);

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="text-gray-600 body-font">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          {isAuthenticated && (
            <button onClick={signOut} className="mr-5 hover:text-gray-900">
              SignOut
            </button>
          )}
          {isAuthenticated && (
            <Link to="/schedule" className="mr-5 hover:text-gray-900">
              Today's Schedule
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/course" className="mr-5 hover:text-gray-900">
              Courses
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" className="mr-5 hover:text-gray-900">
              Profile
            </Link>
          )}
        </nav>
        <Link
          to="/"
          className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Microsoft Engage</span>
        </Link>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <div className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-gray-700">
            <label htmlFor="dmcheck">
              ☀
            </label>
            <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
            <label htmlFor="dmcheck">
              ☾
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
