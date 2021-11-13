import { getRole, getUserId } from "../../../utils/token.js";
import CsvDownload from "react-json-to-csv";
import Api, { responseErrorHandler } from "../../../utils/Api/Api";
import { toast } from "react-toastify";

const Lecture = ({ lecture, type, course, setCourse }) => {
  const role = getRole();
  const isRegistered = lecture.registeredStudents?.includes(getUserId());

  const registerForLecture = async () => {
    console.log(lecture.registeredStudents, getUserId());
    const toastElement = toast.loading("Registering For Lecture");
    try {
      const response = await Api.student.registerForLecture(
        course._id,
        lecture._id
      );
      const { message } = response.data;
      setCourse({
        ...course,
        activeLectures: course.activeLectures.map((oldLecture) =>
          oldLecture._id === lecture._id
            ? {
                ...lecture,
                registeredStudents: [
                  ...lecture.registeredStudents,
                  getUserId(),
                ],
              }
            : oldLecture
        ),
      });
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-indigo-700">
          {new Date(lecture.startTime).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="mt-1 text-gray-500 text-sm">
          {new Date(lecture.startTime).toLocaleTimeString()}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          Offline Seats Available:{" "}
          {lecture.offlineLectureCapacity - lecture.registeredStudents.length}/
          {lecture.offlineLectureCapacity}
        </h2>
        <p className="leading-relaxed">
          End Time: {new Date(lecture.endTime).toLocaleTimeString()}
        </p>
        <p className="leading-relaxed">
          Minimum Vaccination Criteria:{" "}
          {String(lecture.vaccinationCriteria) === "0"
            ? "No Vaccination Required"
            : String(lecture.vaccinationCriteria) === "1"
            ? "Partially Vaccinated"
            : "Fully Vaccinated"}
        </p>
        {role === "student" && !isRegistered && type === "active" && (
          <button
            onClick={registerForLecture}
            className="text-indigo-500 inline-flex items-center mt-4"
          >
            Register For Offline Lecture
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
        {role === "student" && isRegistered && (
          <button className="text-indigo-600 font-medium inline-flex items-center mt-4">
            Seat Reserved For Offline Lecture
          </button>
        )}
        {role === "teacher" && (
          <div>
            <CsvDownload
              className="text-indigo-500 inline-flex items-center mt-4"
              data={lecture.registeredStudents}
            >
              Download Registered Students
            </CsvDownload>
          </div>
        )}
        {type === "active" && (
          <a
            href={lecture.onlineLectureLink}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-500 inline-flex items-center mt-4"
          >
            Click Here To Join Lecture Online
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default Lecture;
