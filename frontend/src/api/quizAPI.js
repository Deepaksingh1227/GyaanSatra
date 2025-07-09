// api/quizAPI.js
import quizTopics from "../quiz/quizTopics";

export const fetchQuiz = async (slug) => {
  const topic = quizTopics.find((t) => t.slug === slug);
  if (!topic) {
    console.error("Unknown quiz topic:", slug);
    return [];
  }

  const url = `https://opentdb.com/api.php?amount=10&category=${topic.id}&type=multiple`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results.map((q) => {
    const options = [...q.incorrect_answers, q.correct_answer].map(decodeHTML);
    return {
      question: decodeHTML(q.question),
      options: shuffle(options),
      answer: decodeHTML(q.correct_answer),
    };
  });
};

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
