import { getRole } from "../../../utils/token.js";
import { Link } from "react-router-dom";

const Assignment = ({ assignment }) => {
  const role = getRole();
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          {`Assignment Name: ${assignment.name}`}
        </h2>
        {
          role === "teacher" && 
          <p className="leading-relaxed">
            {`Number Of Submissons: ${assignment.submissions.length}`}
          </p>
        }
        <p className="leading-relaxed">
          {assignment.autoGrade ? "Auto Graded" : "Manual Graded"}
        </p>
        <Link
          to={`/course/${assignment.course}/assignment/${assignment._id}`}
          className="text-indigo-500 inline-flex items-center mt-4"
        >
          {role === "teacher" ? "View Submissions" : "Submit Assignment"}
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Assignment;
