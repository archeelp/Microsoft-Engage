import { useParams } from "react-router-dom";
import Description from "../components/Course/Description";
import EnrolledStudnets from "../components/Course/EnrolledStudents";
import Lectures from "../components/Course/Lectures/Lectures";
import Api from "../utils/Api/Api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api";
import { getRole } from "../utils/token";

const Course = () => {
  const role = getRole();
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyAt, setCurrentlyAt] = useState("description");

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Course");
      try {
        const response = await Api[role].getCourse(courseId);
        const { course, message } = response.data;
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setIsLoading(false);
        setCourse(course);
      } catch (error) {
        console.log(error);
        responseErrorHandler(error, toastElement);
      }
    };
    return init();
  }, [courseId, role]);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <div className="flex mx-auto flex-wrap mb-20">
          <button
            onClick={() => setCurrentlyAt("description")}
            className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium ${
              currentlyAt === "description"
                ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t"
                : "border-gray-200 hover:text-gray-900"
            } inline-flex items-center leading-none tracking-wider`}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Description
          </button>
          <button
            onClick={() => setCurrentlyAt("lectures")}
            className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider ${
              currentlyAt === "lectures"
                ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t"
                : "border-gray-200 hover:text-gray-900"
            }`}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            Lectures
          </button>
          {role === "teacher" && (
            <button
              onClick={() => setCurrentlyAt("enrolledStudents")}
              className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none tracking-wider ${
                currentlyAt === "enrolledStudents"
                  ? "bg-gray-100 border-indigo-500 text-indigo-500 rounded-t"
                  : "border-gray-200 hover:text-gray-900"
              }`}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
              </svg>
              Enrolled Students
            </button>
          )}
        </div>
        {currentlyAt === "description" && <Description course={course} />}
        {currentlyAt === "lectures" && (
          <Lectures
            activeLectures={course.activeLectures}
            recentLectures={course.recentLectures}
            course={course}
            setCourse={setCourse}
          />
        )}
        {currentlyAt === "enrolledStudents" && role === "teacher" && (
          <EnrolledStudnets enrolledStudents={course.enrolledStudents} />
        )}
      </div>
    </section>
  );
};

export default Course;
