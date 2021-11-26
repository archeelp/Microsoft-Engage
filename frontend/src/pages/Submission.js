import { useParams } from "react-router-dom";
import Api from "../utils/Api/Api.js";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { getRole } from "../utils/token";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Select from "../components/Select.js";
import TextArea from "../components/TextArea.js";
import Input from "../components/Input.js";

const languages = [{"key":"C","value":"C"},{"key":"C++","value":"CPP"},{"key":"C++11","value":"CPP11"},{"key":"C++14","value":"CPP14"},{"key":"Clojure","value":"CLOJURE"},{"key":"C#  CSHARP"},{"key":"Go","value":"GO"},{"key":"Haskell","value":"HASKELL"},{"key":"Java","value":"JAVA"},{"key":"Java 8","value":"JAVA8"},{"key":"JavaScript(Rhino)","value":"JAVASCRIPT"},{"key":"JavaScript(Nodejs)","value":"JAVASCRIPT_NODE"},{"key":"Kotlin","value":"KOTLIN"},{"key":"Objective C","value":"OBJECTIVEC"},{"key":"Pascal","value":"PASCAL"},{"key":"Perl","value":"PERL"},{"key":"PHP","value":"PHP"},{"key":"Python 2","value":"PYTHON"},{"key":"Python 3","value":"PYTHON3"},{"key":"R","value":"R"},{"key":"Ruby","value":"RUBY"},{"key":"Rust","value":"RUST"},{"key":"Scala SCALA"},{"key":"Swift","value":"SWIFT"},{"key":"Swift 4.1","value":"SWIFT_4_1"}];
const languagesMap = {
  ...Object.fromEntries(languages.map(language => [language.key, language.value])),
  ...{
    "CPP11":"cpp",
    "CPP14":"cpp",
    "CLOJURE":"coljure",
    "JAVA8":"java",
    "JAVASCRIPT_NODE":"javascript",
    "PYTHON3":"python",
    "SWIFT_4_1":"swift"
  }
};

const Submission = () => {
  const role = getRole();
  const { courseId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState(languages[0].value);
  const [source, setSource] = useState("");

  const submissionRef = useRef(null);
  const executeScroll = () => submissionRef.current?.scrollIntoView();   

  const submitAssignment = async () => {
    const toastElement = toast.loading("Submitting Assignment");
    try {
      const response = await Api.student.submitAssignment(courseId, assignmentId, {language, source});
      const { message } = response.data;
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      setSubmission({language, source});
    } catch (error) {
      console.log(error);
      responseErrorHandler(error, toastElement);
    }
  }

  const gradeAssignment = async () => {
    const toastElement = toast.loading("Grading Assignment");
    try {
      const response = await Api.teacher.gradeSubmission(courseId, assignmentId, submission._id, {grade: submission.grade});
      const { message } = response.data;
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
  }

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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Assignment {assignment.autoGrade?"Auto Graded":"Manually Graded"}</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{assignment.name}</h1>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">QUESTION</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {assignment.question}
          </ReactMarkdown>
        </div>
        {
          role === "teacher" && assignment.autoGrade && (
            <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-5">
              <h1 className="text-lg font-medium text-gray-900 title-font mb-2">Auto Graded Assignment</h1>
              <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">Input</h1>
              <p>
                {assignment.input?assignment.input:"No input"}
              </p>
              <h1 className="text-2xl font-medium text-gray-900 title-font mb-2">Expected Output</h1>
              <p>
                {assignment.output?assignment.output:"No output"}
              </p>
            </div>
          )
        }
        {
          submission && (
            <>
              <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-5" ref={submissionRef}>
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Grade: {submission.grade?submission.grade:"N/A"}
                </h2>
                {
                  role === "teacher" && (
                    <>
                      <Input
                        label="Grade"
                        type="number"
                        setter={(value) => setSubmission({...submission, grade: value})}
                        value={submission.grade}
                      />
                      <button
                        onClick={gradeAssignment}
                        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      >
                        Grade Assignment
                      </button>
                    </>
                  )
                }
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Source Code
                </h2>
                <SyntaxHighlighter language={languagesMap[submission.language]} style={atomDark}>
                  {submission.source}
                </SyntaxHighlighter>
              </div>
            </>
          )
        }
        {
          role === "student" && !submission && (
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
          )
        }
        {
          role === "teacher" && (
            <div className="-my-8 divide-y-2 divide-gray-100 mt-5">
              <h1 className="text-3xl font-medium text-gray-900 title-font mb-2">
                Submissions
              </h1>
              {
                assignment.submissions.map(submission => {
                  return (
                    <div className="py-8 flex flex-wrap md:flex-nowrap">
                      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span className="font-semibold title-font text-gray-700">{submission.student.name}</span>
                        <span className="mt-1 text-gray-500 text-sm">{new Date(submission.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="md:flex-grow">
                        <button onClick={() => {setSubmission(submission); executeScroll();}} className="text-indigo-500 inline-flex items-center mt-4">View Submission
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )
        }
        
      </div>
    </section>
  );
}

export default Submission;