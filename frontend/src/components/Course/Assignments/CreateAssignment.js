import { useState } from "react";
import { toast } from "react-toastify";
import Api, { responseErrorHandler } from "../../../utils/Api/Api";
import Input from "../../Input";
import Radio from "../../Radio";
import Editor from "../../Editor";
import TextArea from "../../TextArea";

import { EditorState, convertToRaw } from "draft-js";
import draftToMarkdown from "draftjs-to-markdown";

const CreateAssignment = ({ course, setCourse }) => {
  const [name, setName] = useState("");
  const [autoGrade, setAutoGrade] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [maxGrade, setMaxGrade] = useState(10);

  const submit = async () => {
    const toastElement = toast.loading("Creating Assignment");
    try {
      const questionHTML = draftToMarkdown(
        convertToRaw(editorState.getCurrentContent())
      );
      const response = await Api.teacher.createAssignment(course._id, {
        name,
        autoGrade,
        input,
        output,
        maxGrade,
        question: questionHTML,
      });
      const { message, assignment } = response.data;
      setCourse({
        ...course,
        assignments: [...course.assignments, assignment],
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

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Create Assignment
      </h2>
      <Input
        label="Assignment Name"
        type="text"
        setter={setName}
        value={name}
      />
      <Radio
        label="Grading Method"
        value={autoGrade}
        setter={(v) => setAutoGrade(v === "true" ? true : false)}
        options={[
          {
            name: "autoGrade",
            value: false,
            label: "Manual",
          },
          {
            name: "autoGrade",
            value: true,
            label: "Auto",
          },
        ]}
      />
      {autoGrade && (
        <>
          <TextArea
            label="Input Test Cases For Program"
            type="text"
            setter={setInput}
            value={input}
          />
          <TextArea
            label="Expected Output Of The Test Cases"
            type="text"
            setter={setOutput}
            value={output}
          />
          <Input
            label="Max Grade"
            type="text"
            setter={setMaxGrade}
            value={maxGrade}
          />
        </>
      )}
      <Editor
        label="Assignment Question"
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Create Assignment
      </button>
    </div>
  );
};

export default CreateAssignment;
