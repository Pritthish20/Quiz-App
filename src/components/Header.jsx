import React, { useState, useEffect } from "react";

const Header = ({ timeLeft,setTimeLeft,status,setStatus,name }) => {
 

  useEffect(() => {
    if (status!=="active") return;

    if (timeLeft <= 0) {
      setStatus("finished");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <header className="bg-blue-700 p-4 flex justify-between text-white shadow-md">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-3 px-4">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-lg font-semibold px-1">QUIZ</span>
      </div>
      
      {/* Timer Section */}
      {status==="active" && (
        <div className="flex gap-3">
          <div className="mt-2 text-xl ">{name} </div>
          <div className="mt-2 text-lg bg-orange-500 px-4 py-1 rounded-lg">
          <span>Total Time Left: {formatTime(timeLeft)}</span>
        </div>
        </div>
      )}
    </header>
  );
};

export default Header;
