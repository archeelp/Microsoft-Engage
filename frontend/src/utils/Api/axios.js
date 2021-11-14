import axios from "axios";
import {baseURL} from "../../constants.js";

axios.defaults.baseURL = baseURL;

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
