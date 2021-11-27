import { useParams } from "react-router-dom";
import Api from "../utils/Api/Api.js";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { getRole } from "../utils/token";

import SubmissionList from "../components/Submission/SubmissionList.js";
import SubmitAssignment from "../components/Submission/SubmitAssignment.js";
import Description from "../components/Submission/Description.js";
import SubmissionView from "../components/Submission/SubmissionView.js";

const Submission = () => {
  const role = getRole();
  const { courseId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const submissionRef = useRef(null);
  const executeScroll = () => submissionRef.current?.scrollIntoView();

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Assignment");
      try {
        const response = await Api[role].getAssignment(courseId, assignmentId);
        const { assignment, submission, message } = response.data;
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setAssignment(assignment);
        setSubmission(submission);
        setIsLoading(false);
      } catch (error) {
        responseErrorHandler(error, toastElement);
      }
    };
    return init();
  }, [assignmentId, courseId, role]);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font overflow-hidden mx-10">
      <div className="container px-5 py-10 mx-auto">
        <Description assignment={assignment} />
        {submission && (
          <SubmissionView
            submission={submission}
            assignment={assignment}
            submissionRef={submissionRef}
            setSubmission={setSubmission}
            setAssignment={setAssignment}
            courseId={courseId}
            assignmentId={assignmentId}
          />
        )}
        {role === "student" && !submission && (
          <SubmitAssignment
            setSubmission={setSubmission}
            courseId={courseId}
            assignmentId={assignmentId}
          />
        )}
        {role === "teacher" && (
          <SubmissionList
            onClick={(submission) => {
              setSubmission(submission);
              executeScroll();
            }}
            submissions={assignment.submissions}
          />
        )}
      </div>
    </section>
  );
};

export default Submission;
