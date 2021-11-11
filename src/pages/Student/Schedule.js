import Logo from "../../assets/timeLogo.svg";
import { useState, useEffect } from "react";

const scheduleDump = [
  {
    name: "BCT",
    description: "Blockchain technology",
    timing: "10:00 AM - 11:00 AM",
  },
  {
    name: "BCT",
    description: "Blockchain technology",
    timing: "10:00 AM - 11:00 AM",
  },
  {
    name: "BCT",
    description: "Blockchain technology",
    timing: "10:00 AM - 11:00 AM",
  },
  {
    name: "BCT",
    description: "Blockchain technology",
    timing: "10:00 AM - 11:00 AM",
  },
];

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setSchedule(scheduleDump);
  }, []);

  return (
    <section class="text-gray-600 body-font mx-10">
      <div class="container px-5 py-24 mx-auto flex flex-wrap">
        <div class="flex flex-wrap w-full">
          <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {schedule.map((item, index) => (
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    {item.name} Lecture
                  </h2>
                  <p class="leading-relaxed">Time: {item.timing}</p>
                  <p class="leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <img
            class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src={Logo}
            alt="step"
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
