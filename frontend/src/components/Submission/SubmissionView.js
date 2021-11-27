import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Input from "../Input.js";
import { languagesMap } from "../../constants.js";
import { getRole } from "../../utils/token.js";
import Api, { responseErrorHandler } from "../../utils/Api/Api.js";
import { toast } from "react-toastify";

const SubmissionView = ({
  submission,
  assignment,
  submissionRef,
  setSubmission,
  setAssignment,
  courseId,
  assignmentId,
}) => {
  const gradeAssignment = async () => {
    const toastElement = toast.loading("Grading Assignment");
    try {
      const response = await Api.teacher.gradeSubmission(
        courseId,
        assignmentId,
        submission._id,
        { grade: submission.grade }
      );
      const { message } = response.data;
      setAssignment({
        ...assignment,
        submissions: assignment.submissions.map((sub) =>
          sub._id === submission._id ? { ...sub, grade: submission.grade } : sub
        ),
      });
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      console.log(error);
      responseErrorHandler(error, toastElement);
    }
  };

  const role = getRole();
  return (
    <>
      <div
        className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-5"
        ref={submissionRef}
      >
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Grade: {submission.grade ? submission.grade : "N/A"}
        </h2>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 mt-0.5">
          Programming Language: {submission.language}
        </h2>
        {role === "teacher" && (
          <>
            <Input
              label="Grade"
              type="number"
              setter={(value) => setSubmission({ ...submission, grade: value })}
              value={submission.grade}
            />
            <button
              onClick={gradeAssignment}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Grade Assignment
            </button>
          </>
        )}
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5 mt-0.5">
          Source Code
        </h2>
        <SyntaxHighlighter
          language={languagesMap[submission.language]}
          style={atomDark}
        >
          {submission.source}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default SubmissionView;
