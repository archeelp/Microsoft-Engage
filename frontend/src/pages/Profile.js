import Api from "../utils/Api/Api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Radio from "../components/Radio";

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
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-0 md:mt-10 lg:w-1/2 md:w-2/3 mx-auto">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Update Profile
      </h2>
      <Input
        label="Full Name"
        value={user.name}
        setter={(value) => setUser({ ...user, name: value })}
        type={"text"}
        name={"name"}
        readOnly
      />
      <Input
        label="Email"
        value={user.email}
        setter={(value) => setUser({ ...user, email: value })}
        type={"email"}
        email={"email"}
        readOnly
      />
      <Input
        label="Mobile"
        value={user.mobile}
        setter={(value) => setUser({ ...user, mobile: value })}
        type={"text"}
        email={"mobile"}
        readOnly
      />
      <Radio
        label="Vaccination Status"
        value={user.vaccinationStatus}
        setter={(value) => setUser({ ...user, vaccinationStatus: value })}
        options={[
          {
            name: "vaccinationStatus",
            value: "0",
            label: "Not Vaccinated",
          },
          {
            name: "vaccinationStatus",
            value: "1",
            label: "Partially Vaccinated",
          },
          {
            name: "vaccinationStatus",
            value: "2",
            label: "Fully Vaccinated",
          },
        ]}
      />
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
