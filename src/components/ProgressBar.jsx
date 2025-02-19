import React from "react";

const ProgressBar = ({ completed, total,score}) => {
  const progress = (completed / total) * 100;
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl flex  ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-blue-400 rounded-full h-4 overflow-hidden mt-4 mx-auto">
      <div
        className="bg-blue-700 h-full text-center text-xs text-white leading-4 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        {completed} / {total}
      </div>
    </div>
    <div className="p-2 text-lg w-auto text-green-700">Score : {score}</div>
    </div>
  );
};

export default ProgressBar;