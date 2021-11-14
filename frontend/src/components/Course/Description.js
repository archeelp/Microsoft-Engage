import CourseLogo from "../../assets/courseLogo.svg";
import { toast } from "react-toastify";
import {publicURL} from "../../constants.js";

const Description = ({ course }) => {
  return (
    <>
      <img
        className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded"
        alt="hero"
        src={CourseLogo}
      />
      <div className="flex flex-col text-center w-full">
        <h1 className="text-xl font-medium title-font mb-4 text-gray-900">
          {course.name}
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          {course.description}
        </p>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Course Capacity: {course.totalCapacity}
        </p>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Offline Lecture Capacity: {course.offlineLectureCapacity}
        </p>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Teacher: {course.teacher?.name}
        </p>
        <a
          href={course.onlineLectureLink}
          target="_blank"
          rel="noreferrer"
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto my-2"
        >
          Join Lecture Online
        </a>
        <button
          onClick={async () => {
            const toastElement = toast.loading(
              "Copying Invite Link To Clipboard"
            );
            try {
              await navigator.clipboard.writeText(
                `${publicURL}/course/join/${course._id}`
              );
              toast.update(toastElement, {
                render: "Copied Invite Link",
                type: "success",
                isLoading: false,
                autoClose: true,
              });
            } catch (error) {
              toast.update(toastElement, {
                render: error.message,
                type: "error",
                isLoading: false,
                autoClose: true,
              });
            }
          }}
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto my-2"
        >
          Copy Course Invite Link
        </button>
      </div>
    </>
  );
};

export default Description;
