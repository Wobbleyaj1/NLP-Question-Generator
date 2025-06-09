export function downloadQuizAsCSV(quiz) {
  const header =
    "Question,Option 1,Option 2,Option 3,Option 4,Correct Answer\n";
  const rows = quiz.map((q) =>
    [
      `"${q.question.replace(/"/g, '""')}"`,
      ...q.options.map((opt) => `"${opt.replace(/"/g, '""')}"`),
      `"${q.correct.replace(/"/g, '""')}"`,
    ].join(",")
  );
  const csvContent = header + rows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadResultsAsCSV(quiz, answers) {
  const header = "Question,Your Answer,Correct Answer\n";
  const rows = quiz.map((q, i) =>
    [
      `"${q.question.replace(/"/g, '""')}"`,
      `"${answers[i] || ""}"`,
      `"${q.correct.replace(/"/g, '""')}"`,
    ].join(",")
  );
  const csvContent = header + rows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz_results.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
