import React from 'react';
import {instructions} from '../constants/instructions'

const Instructions = ({ onProceed }) => {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Quiz Instructions
        </h1>
        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-start">
              <span className="text-lg font-semibold text-gray-700 mr-2">{index + 1}.</span>
              <p className="text-gray-600">{instruction}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onProceed}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Proceed to Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;