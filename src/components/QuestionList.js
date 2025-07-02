import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // GET /questions - fetch questions once
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      });
  }, []);

  // DELETE /questions
  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    });
  }

  // PATCH /questions/:id
  const handleUpdatedQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map((q) => 
     q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);

  fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: updatedQuestion.correctIndex,
    }),
  })
  .then((resp) => resp.json())
  .then((data) => {
    console.log("Server response after PATCH:", data)
  });
};

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) =>
            <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdatedQuestion} />
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
