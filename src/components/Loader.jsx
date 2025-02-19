import React from "react";

const Loader = () => {
  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto animate-pulse">
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 w-24 bg-gray-300 rounded"></div>
      <div className="h-6 w-24 bg-gray-300 rounded"></div>
    </div>
    <div className="h-8 w-3/4 bg-gray-300 rounded mb-6"></div>
    <div className="space-y-4">
      <div className="h-12 w-full bg-gray-300 rounded"></div>
      <div className="h-12 w-full bg-gray-300 rounded"></div>
      <div className="h-12 w-full bg-gray-300 rounded"></div>
      <div className="h-12 w-full bg-gray-300 rounded"></div>
    </div>
  </div>
  );
};

export default Loader;