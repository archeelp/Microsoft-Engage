import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { isLoggedIn } from "../utils/token";
import { toast } from "react-toastify";
import Api from "../utils/Api/Api";
import { useNavigate } from "react-router-dom";

const JoinCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        if (isLoggedIn()) {
          const response = await Api.student.enrollCourse(courseId);
          const { message } = response.data;
          toast.success(message);
          navigate("/course");
        } else {
          toast.error("You are not logged in! Please login to join the course");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    return init();
  }, [courseId, navigate]);

  return <Loader />;
};

export default JoinCourse;
