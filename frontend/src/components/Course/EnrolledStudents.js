const EnrolledStudents = ({ enrolledStudents }) => {
  return (
    <section class="text-gray-600 body-font overflow-hidden lg:w-1/3 md:w-2/3 mx-auto">
      <div class="container px-5 py-24 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
          {enrolledStudents.map((student, index) => {
            return (
              <div class="py-8 flex flex-wrap md:flex-nowrap" key={index}>
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">
                    {student.name}
                  </span>
                </div>
                <div class="md:flex-grow">
                  <p class="leading-relaxed">Email: {student.email} </p>
                  <p class="leading-relaxed">Mobile: {student.mobile}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnrolledStudents;
