// QuizGenerator.jsx
import React, { useState } from "react";

export default function QuizGenerator() {
  const [paragraph, setParagraph] = useState("");
  const [numQuestions, setNumQuestions] = useState(3);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({}); // user answers
  const [submitted, setSubmitted] = useState(false);

  async function handleGenerate() {
    const res = await fetch("http://localhost:8000/generate_quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paragraph, num_questions: numQuestions }),
    });
    const data = await res.json();
    if (data.quiz) {
      // Shuffle options for each question (correct + distractors)
      const shuffledQuiz = data.quiz.map((q) => {
        const options = [q.correct_answer, ...q.distractors];
        return {
          question: q.question,
          options: options.sort(() => Math.random() - 0.5),
          correct: q.correct_answer,
        };
      });
      setQuiz(shuffledQuiz);
      setAnswers({});
      setSubmitted(false);
    } else {
      alert("Failed to generate quiz.");
    }
  }

  function handleAnswerChange(qIndex, selected) {
    setAnswers((prev) => ({ ...prev, [qIndex]: selected }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>Quiz Generator</h1>
      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder="Enter paragraph here"
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />
      <br />
      <label>
        Number of Questions:{" "}
        <input
          type="number"
          min={1}
          max={10}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleGenerate}>Generate Quiz</button>

      {quiz.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ marginTop: 20 }}
        >
          {quiz.map((q, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <b>
                Q{i + 1}: {q.question}
              </b>
              <div>
                {q.options.map((opt, idx) => (
                  <label key={idx} style={{ display: "block", marginTop: 5 }}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      disabled={submitted}
                      checked={answers[i] === opt}
                      onChange={() => handleAnswerChange(i, opt)}
                    />{" "}
                    {opt}
                  </label>
                ))}
              </div>
              {submitted && (
                <div
                  style={{
                    color: answers[i] === q.correct ? "green" : "red",
                    fontWeight: "bold",
                    marginTop: 5,
                  }}
                >
                  {answers[i] === q.correct
                    ? "Correct!"
                    : `Incorrect. Correct answer: ${q.correct}`}
                </div>
              )}
            </div>
          ))}

          {!submitted && (
            <button type="submit" disabled={Object.keys(answers).length !== quiz.length}>
              Submit Answers
            </button>
          )}
        </form>
      )}
    </div>
  );
}
