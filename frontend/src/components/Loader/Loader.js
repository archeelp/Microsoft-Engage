import "./Loader.scoped.css";

const Loader = () => {
  return (
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div className="text-center lg:w-2/3 w-full">
        <div className="flex justify-center">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
