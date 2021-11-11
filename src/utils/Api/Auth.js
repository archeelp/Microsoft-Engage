import axios from "./axios.js";

const AuthApi = {
  signIn: ({ email, password }) => {
    return axios.post("/auth/signin", { email, password });
  },
  signUp: ({ email, password, mobile, name, role, vaccinationStatus }) => {
    return axios.post("/auth/signup", { email, password, mobile, name, role, vaccinationStatus });
  },
}

export default AuthApi;