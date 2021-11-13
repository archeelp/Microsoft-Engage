import ScheduleLogo from "../assets/timeLogo.svg";
import { useState, useEffect } from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api.js";
import { getRole, getUserId } from "../utils/token.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";
import CsvDownload from "react-json-to-csv";

const Schedule = () => {
  const role = getRole();
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Schedule");
      try {
        const response = await Api[getRole()].getSchedule();
        const { lectures, message } = response.data;
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setSchedule(lectures);
        setIsLoading(false);
      } catch (error) {
        responseErrorHandler(error, toastElement);
      }
    };
    init();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="text-gray-600 body-font mx-10">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {schedule.map((lecture, index) => (
              <div className="flex relative pb-12" key={index}>
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    {lecture.course?.name} Lecture
                  </h2>
                  <p className="leading-relaxed">
                    Date: {new Date(lecture.startTime).toLocaleDateString()}
                  </p>
                  <p className="leading-relaxed">
                    Time: {new Date(lecture.startTime).toLocaleTimeString()} -{" "}
                    {new Date(lecture.endTime).toLocaleTimeString()}
                  </p>
                  <p className="leading-relaxed">
                    {lecture.course.description}
                  </p>
                  {role === "student" && (
                    <p className="leading-relaxed">
                      {lecture.registeredStudents.includes(getUserId())
                        ? "Registered For Offline"
                        : "Not Registered For Offline"}
                    </p>
                  )}
                  {role === "teacher" && (
                    <CsvDownload
                      className="flex-1 justify-center inline-flex text-white bg-indigo-500 border-0 py-1 px-1 focus:outline-none hover:bg-indigo-600 rounded text-md mr-1"
                      data={lecture.registeredStudents}
                    >
                      Download Registered Students
                    </CsvDownload>
                  )}
                  <a
                    href={lecture.onlineLectureLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 justify-center inline-flex text-white bg-indigo-500 border-0 py-1 px-1 focus:outline-none hover:bg-indigo-600 rounded text-md"
                  >
                    Join Lecture
                  </a>
                </div>
              </div>
            ))}
          </div>
          <img
            className="lg:w-3/5 md:w-1/2 object-contain object-center rounded-lg md:mt-0 mt-12"
            src={ScheduleLogo}
            alt="step"
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
