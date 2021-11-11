import axios from "./axios.js";

const UserApi = {
  updateProfile: (user) => {
    return axios.put("/user", user);
  }
}

export default UserApi;