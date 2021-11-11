import { useState } from "react";
import React from "react";
import Popup from "reactjs-popup";
import Api from "../utils/api";
import { toast } from "react-toastify";
import validator from "validator";

const contentStyle = { background: "rgba(255,255,255,0)", borderStyle: "none" };
const overlayStyle = { background: "rgba(0,0,0,0.5)" };

const AuthModal = ({ setIsAuthenticated, close, isSignIn }) => {
  const [signIn, setSignIn] = useState(isSignIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [vaccinationStatus, setVaccinationStatus] = useState(0);

  const submit = async () => {
    if (!validator.isEmail(email)) {
      return toast("Invalid Email Address");
    }
    if (!signIn && !validator.isMobilePhone(`+91${mobile}`)) {
      return toast("Invalid Mobile Number");
    }
    if (!signIn && name.length < 3) {
      return toast("Invalid Name");
    }
    if (password.length < 8) {
      return toast("Please Use A Password With Minimum Length 8");
    }
    const toastElement = toast.loading(signIn?"Logging You In":"Signing You Up");
    try {
      console.log({ email, password, mobile, name, role });
      const response = signIn
        ? await Api.signIn({ email, password })
        : await Api.signUp({ email, password, mobile, name, role, vaccinationStatus });
      toast.update(toastElement, {
        render: signIn?"Logged In Successfully":"Account Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      return close();
    } catch (error) {
      if (!error.response) {
        toast.update(toastElement, {
          render: "Network Error",
          type: "error",
          isLoading: false,
          autoClose: true,
        });
      } else {
        toast.update(toastElement, {
          render: error.response.data.error.message,
          type: "error",
          isLoading: false,
          autoClose: true,
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Sign {signIn ? "In" : "Up"}
      </h2>
      {!signIn && (
        <div className="relative mb-4">
          <label className="leading-7 text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      )}
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      {!signIn && (
        <div className="relative mb-4">
          <label className="leading-7 text-sm text-gray-600">Mobile</label>
          <input
            type="number"
            onChange={(e) => setMobile(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      )}
      {!signIn && (
        <div className="relative mb-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="role"
              value="tutor"
              onChange={(e) => setRole(e.target.value)}
            />
            <span class="ml-2">Tutor</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="role"
              value="student"
              onChange={(e) => setRole(e.target.value)}
              checked
            />
            <span class="ml-2">Student</span>
          </label>
        </div>
      )}
      {!signIn && (
        <div className="relative mb-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="vaccinationStatus"
              value="0"
              onChange={(e) => setVaccinationStatus(e.target.value)}
              checked
            />
            <span class="ml-2">Not Vaccinated</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="vaccinationStatus"
              value="1"
              onChange={(e) => setVaccinationStatus(e.target.value)}
            />
            <span class="ml-2">Partially Vaccinated</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="vaccinationStatus"
              value="2"
              onChange={(e) => setVaccinationStatus(e.target.value)}
            />
            <span class="ml-2">Fully Vaccinated</span>
          </label>
        </div>
      )}
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Sign{signIn ? "In" : "Up"}
      </button>
      <div className="text-s text-gray-500 mt-3">
        {signIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setSignIn(!signIn)} className="text-indigo-500">
          Sign{signIn ? "Up" : "In"}
        </button>
      </div>
    </div>
  );
};

const Auth = ({ setIsAuthenticated, isSignIn, ...props }) => {
  return (
    <Popup
      {...{ contentStyle, overlayStyle }}
      trigger={<button {...props}>{isSignIn ? "SignIn" : "SignUp"}</button>}
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <AuthModal
          isSignIn={isSignIn}
          close={close}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </Popup>
  );
};

export default Auth;
