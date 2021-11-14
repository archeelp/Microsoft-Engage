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
import { StarterCard, CourseCard } from "../components/Card.js";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const role = getRole();

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
              Button={
                <button className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="courseLogo"
                      className="object-cover object-center w-full h-full block"
                      src={CreateNewCourseLogo}
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      Create New Course
                    </h2>
                  </div>
                </button>
              }
              setCourses={setCourses}
              courses={courses}
              mode="create"
              currentCourseIndex={-1}
            />
          )}
          {role === "student" && courses.length === 0 && (
            <StarterCard 
              imageSrc={NoCourseFoundLogo}
              title="You haven't enrolled in any course yet. Join using course invite link."
            />
          )}
          {courses.map((course, index) => (
            <CourseCard 
              course={course}
              key={index}
              imageSrc={CourseLogo}
              courses={courses}
              setCourses={setCourses}
              index={index}
              role={role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
