import React, { useState, useEffect } from "react";
import End from "../components/End";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import Register from "../components/Register";
import Done from "../components/Done";
import { questions } from "../constants/questions";
import { clearUserData, registerUser, updateScore} from "../IndexedDB/hooks"; // Import IndexedDB functions

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [status, setStatus] = useState("ready"); // Quiz status: ready, active, instructions, finished
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [score, setScore] = useState(0); // User's score
  const [name, setName] = useState(""); // User's name
 

  const handleRegister=() => {
    registerUser(name);
    setStatus("instructions")
  }

  // Start the quiz
  const startQuiz = () => {
    setStatus("active");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // Move to the next question
  const handleNextQuestion = (updatedScore) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz(updatedScore); // Ensure final score is correctly saved
    }
};

  
  // Finish the quiz and update scores in IndexedDB
  const finishQuiz = async (finalScore) => {
    await updateScore(name, finalScore); // Save the correct score
    setStatus("end");
  };
  
  

  // Restart the quiz
  const restartQuiz = () => {
    setStatus("instructions");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // End the quiz and go to the "Done" screen
  const endQuiz = () => {
    setStatus("finished");
    clearUserData(name);
  };

  return (
    <div className="wrapper min-h-screen bg-gray-100">
      <div className="app">
        <div className="headerWrapper">
          <Header name={name} />
        </div>

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Register State */}
        {status === "ready" && (
          <Register onStart={handleRegister} name={name} setName={setName} />
        )}

        {/* Instructions State */}
        {status === "instructions" && <Instructions onProceed={startQuiz} />}

        {/* Active State: Show Quiz */}
        {status === "active" && (
         <div className="flex flex-col items-center">
          <ProgressBar completed={currentQuestionIndex + 1} total={questions.length} score={score} />
            <QuestionCard
              questionData={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              score={score}
              setScore={setScore}
            />
         </div>
        )}

        {/* End Screen */}
        {status === "end" && (
          <End
            score={score}
            totalQue={questions.length}
            name={name}
            onRetry={restartQuiz}
            onEndQuiz={endQuiz}
          />
        )}

        {/* Done Screen */}
        {status === "finished" && <Done />}
      </div>
    </div>
  );
};

export default Quiz;
