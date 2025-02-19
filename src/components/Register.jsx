import { useState } from "react";

const RegisterPage = ({ onStart ,name,setName}) => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-lg font-semibold mb-4 text-center">Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg mb-4 text-lg"
        />
        <button
          onClick={() => name && onStart(name)}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 text-lg"
          disabled={!name}
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;