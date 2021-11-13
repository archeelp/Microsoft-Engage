import Api from "../utils/Api/Api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const submit = async () => {
    const toastElement = toast.loading("Updating Profile");
    try {
      const response = await Api.user.updateProfile(user);
      const { message } = response.data;
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      navigate("/");
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Profile");
      try {
        const response = await Api.user.getProfile();
        const { user, message } = response.data;
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setUser({ ...user, vaccinationStatus: String(user.vaccinationStatus) });
        setIsLoading(false);
      } catch (error) {
        responseErrorHandler(error, toastElement);
      }
    };
    init();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 lg:w-1/2 md:w-2/3 mx-auto">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Update Profile
      </h2>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Full Name</label>
        <input
          type="text"
          value={user.name}
          readOnly
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={user.email}
          readOnly
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Mobile</label>
        <input
          type="text"
          value={user.mobile}
          readOnly
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Vaccination Status
        </label>
        <br />
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="0"
            onChange={(e) =>
              setUser({ ...user, vaccinationStatus: e.target.value })
            }
            checked={user.vaccinationStatus === "0"}
          />
          <span className="ml-2">Not Vaccinated</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="1"
            onChange={(e) =>
              setUser({ ...user, vaccinationStatus: e.target.value })
            }
            checked={user.vaccinationStatus === "1"}
          />
          <span className="ml-2">Partially Vaccinated</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="2"
            onChange={(e) =>
              setUser({ ...user, vaccinationStatus: e.target.value })
            }
            checked={user.vaccinationStatus === "2"}
          />
          <span className="ml-2">Fully Vaccinated</span>
        </label>
      </div>
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
