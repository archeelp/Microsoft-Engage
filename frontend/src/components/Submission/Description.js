import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getRole } from "../../utils/token.js";

const Description = ({ assignment }) => {
  const role = getRole();
  return (
    <>
      <div className="flex flex-col text-center w-full mb-5">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          Assignment {assignment.autoGrade ? "Auto Graded" : "Manually Graded"}
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          {assignment.name}
        </h1>
      </div>
      <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">
          QUESTION
        </h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {assignment.question}
        </ReactMarkdown>
      </div>
      {role === "teacher" && assignment.autoGrade && (
        <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-5">
          <h1 className="text-lg font-medium text-gray-900 title-font mb-2">
            Auto Graded Assignment
          </h1>
          <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">
            Input
          </h1>
          <p>{assignment.input ? assignment.input : "No input"}</p>
          <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">
            Expected Output
          </h1>
          <p>{assignment.output ? assignment.output : "No output"}</p>
        </div>
      )}
    </>
  );
};

export default Description;
