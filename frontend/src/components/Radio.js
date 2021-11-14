const Radio = ({ options, label, setter, value }) => {
  return (
    <div className="relative mb-4">
      <label className="leading-7 text-sm text-gray-600">{label}</label>
      <br />
      {options.map((option, index) => {
        return (
          <label
            className={`inline-flex items-center ${
              index === 0 ? "" : "lg:ml-6 md:ml-2"
            }`}
            key={index}
          >
            <input
              type="radio"
              className="form-radio"
              name={option.name}
              value={option.value}
              onChange={(e) => setter(e.target.value)}
              checked={value === option.value}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Radio;
