import React from "react";
import "./QuizzesCards.css";

const QuizzesCards = () => {
  const quizzes = [
    {
      title: "Forensic Science Quiz",
      description: "Test your knowledge with interactive quizzes",
      questions: 25,
      duration: "30 minutes",
    },
    {
      title: "Data Structures & Algorithms Quiz",
      description: "Test your knowledge with interactive quizzes",
      questions: 25,
      duration: "30 minutes",
    },
    {
      title: "Frontend Development Quiz",
      description: "Test your knowledge with interactive quizzes",
      questions: 25,
      duration: "30 minutes",
    },
    {
      title: "Backend Development Quiz",
      description: "Test your knowledge with interactive quizzes",
      questions: 25,
      duration: "30 minutes",
    },
  ];

  return (
    <div className="quizzes-cards-container">
      {quizzes.map((quiz, index) => (
        <div key={index} className="quiz-card">
          <h3>❓ {quiz.title}</h3>
          <p>{quiz.description}</p>
          <div className="quiz-details">
            <div>
              <strong>Questions:</strong> {quiz.questions}
            </div>
            <div>
              <strong>Duration:</strong> {quiz.duration}
            </div>
          </div>
          <button>Start Quiz</button>
        </div>
      ))}
    </div>
  );
};

export default QuizzesCards;
