const EnrolledStudents = ({ enrolledStudents }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden lg:w-1/3 md:w-2/3 mx-auto">
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {enrolledStudents.length === 0 && (
            <h1 className="text-3xl font-medium text-gray-900 title-font mb-2 text-center">
              No students enrolled
            </h1>
          )}
          {enrolledStudents.map((student, index) => {
            return (
              <div className="py-8 flex flex-wrap md:flex-nowrap" key={index}>
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-600">
                    {student.name}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <p className="leading-relaxed">Email: {student.email} </p>
                  <p className="leading-relaxed">Mobile: {student.mobile}</p>
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
