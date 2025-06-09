import React, { useEffect, useState } from "react";
import { downloadQuizAsCSV, downloadResultsAsCSV } from "../utils/csvUtils";
import { fetchWithRetry } from "../utils/fetchWithRetry";

import ModeSelector from "./ModeSelector";
import QuizInputForm from "./QuizInputForm";
import QuizQuestionDialog from "./QuizQuestionDialog";
import QuizResultsDialog from "./QuizResultsDialog";

export default function QuizGenerator() {
  const [paragraph, setParagraph] = useState("");
  const [numQuestions, setNumQuestions] = useState(3);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [mode, setMode] = useState("take"); // "take" or "download"
  const [status, setStatus] = useState("");

  const handlePrev = () => setCurrentQuestion((i) => i - 1);
  const handleNext = () => setCurrentQuestion((i) => i + 1);

  async function handleGenerate() {
    setLoading(true);
    setStatus("");
    try {
      const data = await fetchWithRetry(
        "https://nlp-question-generator.onrender.com/generate_quiz",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paragraph, num_questions: numQuestions }),
        },
        5, // retries
        15000, // delay ms
        setStatus
      );
      setStatus("");
      if (data.quiz) {
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
        setCurrentQuestion(0);

        if (mode === "download") {
          downloadQuizAsCSV(shuffledQuiz);
        } else {
          setOpenQuizDialog(true);
        }
      } else {
        alert("Failed to generate quiz.");
      }
    } catch (err) {
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  }

  function handleAnswerChange(qIndex, selected) {
    setAnswers((prev) => ({ ...prev, [qIndex]: selected }));
  }

  function handleSubmit() {
    setSubmitted(true);
    setOpenQuizDialog(false);
    setOpenResultsDialog(true);
  }

  function handleExportResults() {
    downloadResultsAsCSV(quiz, answers);
  }

  useEffect(() => {
    document.title = "NLP Question Generator";
  }, []);

  return (
    <div>
      {status && (
        <div
          style={{ textAlign: "center", color: "#1976d2", marginBottom: 12 }}
        >
          {status}
        </div>
      )}
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        NLP Question Generator
      </h1>
      <ModeSelector mode={mode} setMode={setMode} />
      <QuizInputForm
        paragraph={paragraph}
        setParagraph={setParagraph}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
        loading={loading}
        handleGenerate={handleGenerate}
      />

      <QuizQuestionDialog
        open={openQuizDialog}
        quiz={quiz}
        currentQuestion={currentQuestion}
        answers={answers}
        submitted={submitted}
        handleAnswerChange={handleAnswerChange}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        handleClose={() => setOpenQuizDialog(false)}
      />

      <QuizResultsDialog
        open={openResultsDialog}
        quiz={quiz}
        answers={answers}
        handleClose={() => setOpenResultsDialog(false)}
        handleExport={handleExportResults}
      />
    </div>
  );
}
