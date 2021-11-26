const TeaxtArea = ({ value, setter, label, ...props }) => {
  return (
    <div className="relative mb-4">
      <label className="leading-7 text-sm text-gray-600">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        {...props}
      />
    </div>
  );
};

export default TeaxtArea;
