import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRole } from "../utils/token.js";
import { responseErrorHandler } from "../utils/Api/Api.js";
import CourseLogo from "../assets/courseLogo.svg";
import CreateNewCourseLogo from "../assets/createNewCourseLogo.svg";
import NoCourseFoundLogo from "../assets/noCourseFoundLogo.svg";
import CourseForm from "../components/CourseForm.js";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const role = getRole();

  const deleteCourse = async (id) => {
    const toastElement = toast.loading("Deleting Course");
    try {
      const response = await Api.teacher.deleteCourse(id);
      const { message } = response.data;
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Courses");
      try {
        const response = await Api[getRole()].getCourses();
        const { courses, message } = response.data;
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setCourses(courses);
        setIsLoading(false);
      } catch (error) {
        responseErrorHandler(error, toastElement);
      }
    };
    return init();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font mx-10">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {role === "teacher" && (
            <CourseForm
              Button={() => (
                <button className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <button className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="courseLogo"
                      className="object-cover object-center w-full h-full block"
                      src={CreateNewCourseLogo}
                    />
                  </button>
                  <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      Add New Course
                    </h2>
                  </div>
                </button>
              )}
              setCourses={setCourses}
              courses={courses}
              mode="create"
              currentCourseIndex={-1}
            />
          )}
          {
            role === "student" && courses.length === 0 && (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <button className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="courseLogo"
                    className="object-cover object-center w-full h-full block"
                    src={NoCourseFoundLogo}
                  />
                </button>
                <div className="mt-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    You haven't enrolled in any course yet. Join using course invite link.
                  </h2>
                </div>
              </div>
            )
          }
          {courses.map((course, index) => (
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
              <Link
                to={`/course/${course._id}`}
                className="block relative h-48 rounded overflow-hidden"
              >
                <img
                  alt="courseLogo"
                  className="object-cover object-center w-full h-full block"
                  src={CourseLogo}
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {course.description}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {course.name}
                </h2>
                {role === "teacher" && (
                  <div className="flex space-x-2">
                    {
                      <CourseForm
                        Button={
                          <button className="flex-1 justify-center inline-flex text-white bg-indigo-500 border-0 py-1 px-1 focus:outline-none hover:bg-indigo-600 rounded text-md">
                            Edit
                          </button>
                        }
                        setCourses={setCourses}
                        courses={courses}
                        mode="edit"
                        currentCourseIndex={index}
                      />
                    }
                    <button
                      onClick={() => {
                        deleteCourse(course._id);
                      }}
                      className="flex-1 justify-center inline-flex text-white bg-red-500 border-0 py-1 px-1 focus:outline-none hover:bg-red-600 rounded text-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
