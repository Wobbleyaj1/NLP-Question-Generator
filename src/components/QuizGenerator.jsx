import React, { useEffect, useState } from "react";
import QuizInputForm from "./QuizInputForm";
import QuizQuestionDialog from "./QuizQuestionDialog";
import QuizResultsDialog from "./QuizResultsDialog";
import NoChangeDialog from "./NoChangeDialog";

export default function QuizGenerator() {
  const [paragraph, setParagraph] = useState("");
  const [numQuestions, setNumQuestions] = useState(3);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastParagraph, setLastParagraph] = useState("");
  const [lastNumQuestions, setLastNumQuestions] = useState(3);
  const [openNoChange, setOpenNoChange] = useState(false);
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [openResultsDialog, setOpenResultsDialog] = useState(false);

  const handlePrev = () => setCurrentQuestion((i) => i - 1);
  const handleNext = () => setCurrentQuestion((i) => i + 1);

  async function handleGenerate() {
    if (paragraph === lastParagraph && numQuestions === lastNumQuestions) {
      setOpenNoChange(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://nlp-question-generator.onrender.com/generate_quiz",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paragraph, num_questions: numQuestions }),
        }
      );
      const data = await res.json();
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
        setLastParagraph(paragraph);
        setLastNumQuestions(numQuestions);
        setCurrentQuestion(0);
        setOpenQuizDialog(true);
      } else {
        alert("Failed to generate quiz.");
      }
    } catch (err) {
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    document.title = "NLP Question Generator";
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        NLP Question Generator
      </h1>
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
      />

      <NoChangeDialog
        open={openNoChange}
        onClose={() => setOpenNoChange(false)}
      />
    </div>
  );
}
