import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getUserData} from "../IndexedDB/hooks"; // Import IndexedDB functions

const End = ({ name, score, totalQue, onRetry, onEndQuiz }) => {
  const [attempts, setAttempts] = useState([]);
  const [highScore, setHighScore] = useState(0);

  // Colors for the Pie Chart
  const COLORS = ["#4CAF50", "#F44336"];
  const data = [
    { name: "Correct", value: score },
    { name: "Incorrect", value: totalQue - score },
  ];

  // Load user data and update attempts
  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData(name);
      if (userData) {
        console.log(userData);
        setHighScore(userData.highScore);
        setAttempts(userData.attempts || []);
      }
    };

    loadUserData();
  }, [name, score]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Test Completed</h2>
        <h3 className="text-lg font-semibold mb-2">Well done, {name}!</h3>
        <p className="text-lg mb-2">
          You scored <span className="font-bold">{score}</span> out of {totalQue}.
        </p>
        <p className="text-lg text-blue-600 mb-4">
          Highest Score: <span className="font-bold">{highScore}</span>
        </p>

        {/* Responsive Pie Chart */}
        <div className="flex justify-center mb-6 h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Previous Attempts */}
        <h3 className="text-lg font-semibold mb-2">Previous Attempts</h3>
        <ul className="mb-4 border p-3 rounded-lg bg-gray-50 max-h-40 overflow-y-auto">
          {attempts.length > 0 ? (
            attempts.map((attempt, index) => (
              <li key={index} className="text-gray-700">
                Attempt {index + 1}: {attempt} / {totalQue}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No previous attempts.</p>
          )}
        </ul>

        <button
          onClick={onRetry}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 text-lg mb-2"
        >
          Try Again
        </button>

        <button
          onClick={onEndQuiz}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 text-lg"
        >
          End Quiz
        </button>
      </div>
    </div>
  );
};

export default End;
