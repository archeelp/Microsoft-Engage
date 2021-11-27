const SubmissionList = ({ submissions, onClick }) => {
  return (
    <div className="-my-8 divide-y-2 divide-gray-100 mt-5">
      <h1 className="text-3xl font-medium text-gray-900 title-font mb-2">
        Submissions
      </h1>
      {submissions.map((submission, index) => {
        return (
          <div className="py-8 flex flex-wrap md:flex-nowrap" key={index}>
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-gray-600">
                {submission.student.name}
              </span>
              <span className="mt-1 text-gray-500 text-sm">
                {new Date(submission.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="md:flex-grow">
              <button
                onClick={() => onClick(submission)}
                className="text-indigo-500 inline-flex items-center mt-4"
              >
                View Submission
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionList;
