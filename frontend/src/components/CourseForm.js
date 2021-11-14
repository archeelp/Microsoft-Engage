import { useState } from "react";
import React from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
import validator from "validator";
import Popup from "./Popup/Popup";
import Input from "./Input";

const CourseModalForm = ({
  close,
  courses,
  setCourses,
  mode,
  currentCourseIndex,
}) => {
  const currentCourse = courses[currentCourseIndex];
  const [name, setName] = useState(currentCourse ? currentCourse.name : "");
  const [description, setDescription] = useState(
    currentCourse ? currentCourse.description : ""
  );
  const [totalCapacity, setTotalCapacity] = useState(
    currentCourse ? String(currentCourse.totalCapacity) : "0"
  );
  const [offlineLectureCapacity, setOfflineLectureCapacity] = useState(
    currentCourse ? String(currentCourse.offlineLectureCapacity) : "0"
  );
  const [onlineLectureLink, setOnlineLectureLink] = useState(
    currentCourse ? currentCourse.onlineLectureLink : ""
  );

  const submit = async () => {
    if (name.length < 3) {
      return toast("Please provide an appropiate course name");
    }
    if (description.length < 10) {
      return toast("Please provide an appropiate course description");
    }
    if (!validator.isURL(onlineLectureLink)) {
      return toast("Invalid online lecture link");
    }
    if (totalCapacity <= 0) {
      return toast("Total capacity must be greater than zero");
    }
    if (!validator.isInt(totalCapacity)) {
      return toast("Total capacity must be an integer");
    }
    if (!validator.isInt(offlineLectureCapacity)) {
      return toast("Offline Lecture Capacity must be an integer");
    }
    const toastElement = toast.loading(
      mode === "edit" ? "Updating Course..." : "Creating course..."
    );
    try {
      if (mode === "edit") {
        const response = await Api.teacher.updateCourse(currentCourse._id, {
          name,
          description,
          totalCapacity,
          offlineLectureCapacity,
          onlineLectureLink,
        });
        const { message, course } = response.data;
        setCourses(
          courses.map((oldCourse) =>
            oldCourse._id === currentCourse._id ? course : oldCourse
          )
        );
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        return close();
      } else if (mode === "create") {
        const response = await Api.teacher.createCourse({
          name,
          description,
          totalCapacity,
          offlineLectureCapacity,
          onlineLectureLink,
        });
        const { message, course } = response.data;
        setCourses([...courses, course]);
        toast.update(toastElement, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        return close();
      }
    } catch (error) {
      responseErrorHandler(error, toastElement);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        {mode === "edit" ? `Edit ${name}` : "Create New Course"}
      </h2>
      <Input label="Course Name" value={name} setter={setName} type="text" />
      <Input
        label="Course Description"
        value={description}
        setter={setDescription}
        type={"textarea"}
      />
      <Input
        label="Total Capacity"
        value={totalCapacity}
        setter={setTotalCapacity}
        type="number"
      />
      <Input
        label="Offline Lecture Capacity"
        value={offlineLectureCapacity}
        setter={setOfflineLectureCapacity}
        type="number"
      />
      <Input
        label="Online Lecture Link"
        value={onlineLectureLink}
        setter={setOnlineLectureLink}
        type={"text"}
      />
      <button
        onClick={submit}
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {mode === "edit" ? "Edit" : "Create"} Course
      </button>
    </div>
  );
};

const CourseForm = ({
  Button,
  courses,
  setCourses,
  mode,
  currentCourseIndex,
  ...props
}) => {
  return (
    <Popup
      Button={Button}
      Modal={CourseModalForm}
      courses={courses}
      setCourses={setCourses}
      mode={mode}
      currentCourseIndex={currentCourseIndex}
      {...props}
    />
  );
};

export default CourseForm;
