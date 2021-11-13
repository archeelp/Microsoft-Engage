import TeacherApi from "./Teacher.js";
import StudentApi from "./Student.js";
import UserApi from "./User.js";
import AuthApi from "./Auth.js";
import { toast } from "react-toastify";

const Api = {
  auth: AuthApi,
  teacher: TeacherApi,
  student: StudentApi,
  user: UserApi,
};

export const responseErrorHandler = (error, toastElement) => {
  if (!error.response) {
    toast.update(toastElement, {
      render: "Network Error",
      type: "error",
      isLoading: false,
      autoClose: true,
    });
  } else {
    console.log(error);
    toast.update(toastElement, {
      render: error.response.data?.error?.message
        ? error.response.data?.error?.message
        : error.response.data?.error
        ? error.response.data?.error
        : "Some Error Occured",
      type: "error",
      isLoading: false,
      autoClose: true,
    });
  }
};

export default Api;
