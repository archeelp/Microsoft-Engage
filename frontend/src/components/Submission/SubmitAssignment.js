import { useState } from "react";
import Api, { responseErrorHandler } from "../../utils/Api/Api.js";
import { toast } from "react-toastify";
import Select from "../Select.js";
import TextArea from "../TextArea.js";
import { languages } from "../../constants.js";

const SubmitAssignment = ({ setSubmission, courseId, assignmentId }) => {
  const [language, setLanguage] = useState(languages[0].value);
  const [source, setSource] = useState("");

  const submitAssignment = async () => {
    const toastElement = toast.loading("Submitting Assignment");
    try {
      const response = await Api.student.submitAssignment(
        courseId,
        assignmentId,
        { language, source }
      );
      const { message } = response.data;
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      setSubmission({ language, source });
    } catch (error) {
      console.log(error);
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-5">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Submit Assignment
      </h2>
      <Select
        label="Programming Language"
        setter={setLanguage}
        value={language}
        list={languages}
      />
      <TextArea
        label="Source Code"
        type="text"
        setter={setSource}
        value={source}
      />
      <button
        onClick={submitAssignment}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Submit Assignment
      </button>
    </div>
  );
};

export default SubmitAssignment;
