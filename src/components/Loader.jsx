import React from "react";

const Loader = ({ text = "please wait..." }) => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center flex-col ">
      <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      <div className="text-green-700 text-2xl mt-12">{text}</div>
    </div>
  );
};

export default Loader;
