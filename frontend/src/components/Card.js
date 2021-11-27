import Api from "../utils/Api/Api.js";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import CourseForm from "../components/CourseForm.js";
import { Link } from "react-router-dom";

export const StarterCard = ({ imageSrc, title }) => {
  return (
    <button className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt="courseLogo"
          className="object-cover object-center w-full h-full block"
          src={imageSrc}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title}
        </h2>
      </div>
    </button>
  );
};

export const CourseCard = ({ imageSrc, role, setCourses, courses, index }) => {
  const course = courses[index];
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

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      <Link
        to={`/course/${course._id}`}
        className="block relative h-48 rounded overflow-hidden"
      >
        <img
          alt="courseLogo"
          className="object-cover object-center w-full h-full block"
          src={imageSrc}
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
  );
};
