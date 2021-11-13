import axios from "axios";

axios.defaults.baseURL = "https://microsoft-engage-2021.herokuapp.com";

axios.interceptors.request.use(
  function (config) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    return { ...config, headers };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
