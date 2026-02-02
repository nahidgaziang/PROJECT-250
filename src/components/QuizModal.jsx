import React, { useState } from 'react';

function QuizModal({ quizData, onClose }) {
  const [answers, setAnswers] = useState({}); // { 0: "answer1", 1: "answer2" }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    // Prevent multiple submissions
    if (isSubmitted) return;
    
    let correctCount = 0;
    let totalMCQs = 0;

    quizData.forEach((item, index) => {
      if (item.type === 'multiple_choice') {
        totalMCQs++;
        const userAnswer = answers[index];
        // Safely compare answers by converting both to string first
        const safeUserAnswer = String(userAnswer || "").trim().toLowerCase();
        const safeCorrectAnswer = String(item.answer || "").trim().toLowerCase();
        
        if (safeUserAnswer === safeCorrectAnswer) {
          correctCount++;
        }
      }
    });

    // Update state together to ensure synchronous update
    setScore({ correct: correctCount, total: totalMCQs });
    setIsSubmitted(true);
    
    // Scroll to show results after a tiny delay to ensure DOM updates
    setTimeout(() => {
      const resultsElement = document.getElementById('quizResultDisplay');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const getOptionClass = (item, index, option) => {
    if (!isSubmitted) return "";
    
    // Safely convert to string for comparison
    const safeOption = String(option || "").trim().toLowerCase();
    const safeCorrectAnswer = String(item.answer || "").trim().toLowerCase();
    const safeUserAnswer = String(answers[index] || "").trim().toLowerCase();

    const isCorrect = safeOption === safeCorrectAnswer;
    const isSelected = answers[index] && safeOption === safeUserAnswer;

    if (isCorrect) return "correct";
    if (isSelected && !isCorrect) return "incorrect";
    return "";
  };

  return (
    <>
      <div id="modalOverlay" onClick={onClose}></div>
      <div id="quizModal" style={{ display: 'flex' }}>
        <div className="modal-header">
          <h2 id="quizTitle">Knowledge Check</h2>
          <button className="modal-close" id="quizCloseBtn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body" id="quizBody">
          
          {/* --- THIS IS THE SCORE DISPLAY --- */}
          {isSubmitted && (
            <div id="quizResultDisplay">
              You scored {score.correct} out of {score.total} on the multiple-choice questions.
            </div>
          )}
  
          {quizData.map((item, index) => (
            <div className="quiz-question" data-index={index} key={index}>
              <p>{`${index + 1}. ${item.question}`}</p>
              {item.type === 'multiple_choice' ? (
                <div className="quiz-options">
                  {item.options.map((option, optIndex) => (
                    <label key={optIndex} className={getOptionClass(item, index, option)}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleAnswerChange(index, option)}
                        disabled={isSubmitted}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  placeholder="Type your answer here..."
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  disabled={isSubmitted}
                  value={answers[index] || ''} // Show user's answer
                ></textarea>
              )}

              {/*
              // --- THIS IS THE NEW EXPLANATION BLOCK ---
              // It only appears after the user clicks "Submit"
              */}
              {isSubmitted && (
                <div className="quiz-explanation">
                  {/* For descriptive, we show the answer. For MCQ, the green highlight is enough. */}
                  {item.type === 'descriptive' && (
                    <p><strong>Correct Answer:</strong> {item.answer}</p>
                  )}
                  <p><strong>Explanation:</strong> {item.explanation || "No explanation provided."}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          {!isSubmitted && (
            <button 
              id="submitQuizBtn" 
              className="primary" 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              style={{
                opacity: Object.keys(answers).length === 0 ? 0.5 : 1,
                cursor: Object.keys(answers).length === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answers
            </button>
          )}
          {isSubmitted && (
            <button className="primary" onClick={onClose}>
              Close Quiz
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizModal;