import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleChange = (e) => {
    const updatedQuestion = {
      ...question, 
      correctIndex: parseInt(e.target.value),
    };
    onUpdateQuestion(updatedQuestion);
    // console.log("Props in QuestionItem:", {onUpdateQuestion})
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <p data-testid="correct-answer">Correct Answer: {answers[correctIndex]}</p>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
