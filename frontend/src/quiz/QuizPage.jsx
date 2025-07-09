// quiz/QuizPage.jsx
import React, { useState } from "react";
import QuizSelector from "./QuizSelector";
import { useQuizGenerator } from "./QuizGenerator";

const QuizPage = () => {
  const [topicSlug, setTopicSlug] = useState(null);
  const { quiz, loading } = useQuizGenerator(topicSlug);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index, answer) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  if (!topicSlug) return <QuizSelector onSelect={(t) => setTopicSlug(t.slug)} />;
  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">{quiz.length}‑Question Quiz on "{topicSlug}"</h2>
      {quiz.map((q, i) => (
        <div key={i} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{i + 1}. {q.question}</h5>
            {q.options.map((opt, j) => (
              <div key={j} className="form-check">
                <input className="form-check-input" type="radio"
                  name={`q${i}`} checked={answers[i] === opt}
                  disabled={submitted}
                  onChange={() => handleAnswer(i, opt)} />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
            {submitted && (
              <p className="mt-2">
                <strong>Answer:</strong> {q.answer}
              </p>
            )}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button className="btn btn-primary" onClick={() => setSubmitted(true)}>
          Submit
        </button>
      ) : (
        <h4 className="mt-3">
          Score: {
            quiz.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
          } / {quiz.length}
        </h4>
      )}
    </div>
  );
};

export default QuizPage;
