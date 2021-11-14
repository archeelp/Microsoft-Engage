import { useState } from "react";
import { toast } from "react-toastify";
import Api, { responseErrorHandler } from "../../../utils/Api/Api";
import Input from "../../Input";
import Radio from "../../Radio";

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
      console.log(error);
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Create Lecture
      </h2>
      <Input 
        label="Start Time"
        type="datetime-local"
        setter={setStartTime}
        value={startTime}
      />
      <Input 
        label="End Time"
        type="datetime-local"
        setter={setEndTime}
        value={endTime}
      />
      <Input 
        label="Offline Lecture Capacity"
        type="number"
        setter={setOfflineLectureCapacity}
        value={offlineLectureCapacity}
      />
      <Input 
        label="Online Lecture Link"
        type="text"
        setter={setOnlineLectureLink}
        value={onlineLectureLink}
      />
      <Radio
        label="Minimum Vaccination Criteria"
        value={vaccinationCriteria}
        setter={setVaccinationCriteria}
        options={[
          {
            name:"vaccinationStatus",
            value:"0",
            label:"Not Vaccinated"
          },
          {
            name:"vaccinationStatus",
            value:"1",
            label:"Partially Vaccinated"
          },
          {
            name:"vaccinationStatus",
            value:"2",
            label:"Fully Vaccinated"
          }
        ]}
      />
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
