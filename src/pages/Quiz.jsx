import React, { useState, useEffect } from "react";
import End from "../components/End";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import Register from "../components/Register";
import { questions } from "../constants/questions";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [status, setStatus] = useState("ready"); // Quiz status: ready, active,instructions, finished
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  // const[quizStarted]
  const [score, setScore] = useState(0); // User's score
  const [highScore, setHighScore] = useState(0); // High score
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // console.log(score);

  const goToInstructions =()=>{
    setStatus("instructions");
  }

  // Start the quiz
  const startQuiz = () => {
    setStatus("active");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30 * 60);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // Finish the quiz
  const finishQuiz = () => {
    setStatus("finished");
    if (score > highScore) {
      setHighScore(score); // Update high score if current score is higher
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setStatus("instructions");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30 * 60);
  };



  return (
    <div className="wrapper min-h-screen bg-gray-100">
      <div className="app">
        <div className="headerWrapper">
          <Header
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          status={status}
          setStatus={setStatus} />
        </div>

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Ready State: Show Instructions and Register */}
        {status === "ready" && (
          <div className="flex flex-col items-center justify-center p-4">
            <Register onStart={goToInstructions} />
          </div>
        )}

        {status==='instructions' && (
          <Instructions onProceed={startQuiz}/>
        )}

        {/* Active State: Show Quiz */}
        {status === "active" && (
          <div className="flex flex-col items-center justify-center p-4">
            <ProgressBar
              completed={currentQuestionIndex + 1}
              total={questions.length}
              score={score}
            />
            <QuestionCard
              questionData={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              score={score}
              setScore={setScore}
            />
          </div>
        )}

        {/* Finished State: Show End Screen */}
        {status === "finished" && (
          <div className="flex flex-col items-center justify-center p-4">
            <End
              score={score}
              totalQue={questions.length}
              // highScore={highScore}
              attempts={[]}
              onRetry={restartQuiz}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;