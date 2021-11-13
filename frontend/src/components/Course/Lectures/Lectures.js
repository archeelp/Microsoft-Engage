import CreateLecture from "./CreateLecture";
import Lecture from "./Lecture";
import { getRole } from "../../../utils/token.js";

const Lectures = ({ course, setCourse }) => {
  const role = getRole();
  return (
    <section className="text-gray-600 body-font lg:w-1/2 md:w-2/3 mx-auto py-2">
      {role === "teacher" && (
        <CreateLecture course={course} setCourse={setCourse} />
      )}
      <div className="container px-5 py-5 mx-auto">
        <h1 className="text-3xl font-medium text-gray-900 title-font mb-2">
          Active Lectures
        </h1>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {course.activeLectures?.map((lecture, index) => (
            <Lecture
              lecture={lecture}
              key={index}
              type="active"
              course={course}
              setCourse={setCourse}
            />
          ))}
        </div>
      </div>
      <div className="container px-5 py-5 mx-auto">
        <h1 className="text-3xl font-medium text-gray-900 title-font mb-2">
          Recent Lectures
        </h1>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {course.recentLectures?.map((lecture, index) => (
            <Lecture
              lecture={lecture}
              key={index}
              type="recent"
              course={course}
              setCourse={setCourse}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lectures;
