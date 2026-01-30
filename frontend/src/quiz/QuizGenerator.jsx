// quiz/QuizGenerator.jsx
import { useEffect, useState } from "react";
import { fetchQuiz } from "../api/quizAPI";

export const useQuizGenerator = (slug) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchQuiz(slug).then((data) => {
      setQuiz(data);
      setLoading(false);
    });
  }, [slug]);

  return { quiz, loading };
};
