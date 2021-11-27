import CreateAssignment from "./CreateAssignment";
import Assignment from "./Assignment";
import { getRole } from "../../../utils/token.js";

const Assignments = ({ course, setCourse }) => {
  const role = getRole();
  return (
    <section className="text-gray-600 body-font lg:w-1/2 md:w-2/3 mx-auto py-2">
      {role === "teacher" && (
        <CreateAssignment course={course} setCourse={setCourse} />
      )}
      <div className="container px-5 py-5 mx-auto">
        <h1 className="text-3xl font-medium text-gray-900 title-font mb-2">
          Assignments
        </h1>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {course.assignments?.map((assignment, index) => (
            <Assignment assignment={assignment} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Assignments;
