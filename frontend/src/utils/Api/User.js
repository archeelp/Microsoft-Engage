import axios from "./axios.js";

const UserApi = {
  updateProfile: (user) => {
    return axios.put("/user", user);
  },
  getProfile: () => {
    return axios.get("/user");
  },
};

export default UserApi;
