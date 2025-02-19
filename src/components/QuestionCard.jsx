import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const QuestionCard = ({ questionData, onNext, score, setScore }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(score); // Ensure the latest score is passed
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    handleReset();
  }, [questionData]);

  const handleReset = () => {
    setTimeLeft(30);
    setIsCorrect(null);
    setSelectedOption(null);
    setInputValue("");
    setLoading(false);
  };

  const handleNext = async (updatedScore) => {
    setLoading(true);
    try {
      await onNext(updatedScore); // Pass latest score to `onNext`
    } catch (error) {
      console.error("Error loading next question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    if (loading) return;
    setInputValue(e.target.value);
  };

  const handleOptionClick = async (option) => {
    if (loading) return;
    
    setSelectedOption(option);
    await new Promise(resolve => setTimeout(resolve, 500));

    const correct = option === questionData.answer;
    setIsCorrect(correct);
    
    let newScore = score; // Capture current score
    if (correct) {
      newScore = score + 1; // Calculate new score
      setScore(newScore); // Update state
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    onNext(newScore); // Pass updated score
};

const handleIntegerSubmit = async () => {
    if (loading) return;
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const correct = parseInt(inputValue, 10) === questionData.answer;
    setIsCorrect(correct);

    let newScore = score;
    if (correct) {
      newScore = score + 1;
      setScore(newScore);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    onNext(newScore); // Pass updated score
};

 

  if (loading) {
    return (
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto min-h-[400px] flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl font-semibold">Score: {score}</span>
        <span className="text-xl font-semibold">Time Left: {timeLeft}s</span>
      </div>

      <h2 className="text-2xl font-semibold mb-6">{questionData.question}</h2>

      {questionData.type === "multiple-choice" ? (
        <div className="space-y-4">
          {questionData.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 border rounded-lg text-left transition-all duration-200 text-xl
                ${selectedOption !== null && option === questionData.answer ? "bg-green-500 text-white" : ""}
                ${selectedOption === option && option !== questionData.answer ? "bg-red-500 text-white" : ""}
                ${selectedOption === null ? "hover:bg-gray-100" : ""}
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== null || loading}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your answer"
            className={`border p-4 rounded-lg w-full transition-all duration-200 text-xl
              ${isCorrect === true ? "border-green-500" : ""}
              ${isCorrect === false ? "border-red-500" : ""}
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isCorrect !== null || loading}
          />
          <button
            onClick={handleIntegerSubmit}
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue || isCorrect !== null || loading}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
