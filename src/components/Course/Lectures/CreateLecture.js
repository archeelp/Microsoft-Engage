import { useState } from "react";
import { toast } from "react-toastify";
import Api, { responseErrorHandler } from "../../../utils/Api/Api";

const CreateLecture = ({ course, setCourse }) => {
  const [offlineLectureCapacity, setOfflineLectureCapacity] = useState(
    course.offlineLectureCapacity
  );
  const [onlineLectureLink, setOnlineLectureLink] = useState(
    course.onlineLectureLink
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vaccinationCriteria, setVaccinationCriteria] = useState("0");

  const submit = async () => {
    const toastElement = toast.loading("Creating Lecture");
    try {
      const response = await Api.teacher.createLecture(course._id, {
        offlineLectureCapacity,
        onlineLectureLink,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        vaccinationCriteria,
      });
      const { message, lecture } = response.data;
      setCourse({
        ...course,
        activeLectures: [...course.activeLectures, lecture],
      });
      toast.update(toastElement, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
      setStartTime("");
      setEndTime("");
      setVaccinationCriteria("0");
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Create Lecture
      </h2>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Start Time</label>
        <input
          type="datetime-local"
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">End Time</label>
        <input
          type="datetime-local"
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Offline Lecture Capacity
        </label>
        <input
          type="number"
          value={offlineLectureCapacity}
          onChange={(e) => setOfflineLectureCapacity(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Online Lecture Link
        </label>
        <input
          type="text"
          value={onlineLectureLink}
          onChange={(e) => setOnlineLectureLink(e.target.value)}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">
          Vaccination Criteria
        </label>
        <br />
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="0"
            onChange={(e) => setVaccinationCriteria(e.target.value)}
            checked={vaccinationCriteria === "0"}
          />
          <span className="ml-2">Not Vaccinated</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="1"
            checked={vaccinationCriteria === "1"}
            onChange={(e) => setVaccinationCriteria(e.target.value)}
          />
          <span className="ml-2">Partially Vaccinated</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio"
            name="vaccinationStatus"
            value="2"
            checked={vaccinationCriteria === "2"}
            onChange={(e) => setVaccinationCriteria(e.target.value)}
          />
          <span className="ml-2">Fully Vaccinated</span>
        </label>
      </div>
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Create Lecture
      </button>
    </div>
  );
};

export default CreateLecture;
