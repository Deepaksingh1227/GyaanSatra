import React from "react";
import quizTopics from "./quizTopics";


const QuizSelector = ({ onSelect }) => (
  <div className="container mt-5">
    <h2 className="text-center mb-5 text-primary fw-bold border-bottom pb-2 mt-5 pt-5">
      Select a Quiz Topic
    </h2>

    <div className="row justify-content-center">
      {quizTopics.map((t) => (
        <div key={t.slug} className="col-sm-6 col-md-3 mb-4 ">
          <button
            className="btn btn-outline-primary w-100 py-3 fs-5 shadow-sm btn-hover "
            onClick={() => onSelect(t)}
          >
            {t.title}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuizSelector;
