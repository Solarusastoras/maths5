import React, { useCallback, useState } from 'react';
import './_validelete.scss';

const useValiDelete = ({ 
  exerciseKey, 
  answers, 
  setAnswers,
  setShowFeedback, 
  setAnswersValidated 
}) => {
  const handleAnswerChange = useCallback((e, index) => {
    const value = e.target.value;
    setAnswers(prevAnswers => {
      const newAnswers = {
        ...prevAnswers,
        [`answer_${index}`]: value
      };
      localStorage.setItem(`${exerciseKey}Answers`, JSON.stringify(newAnswers));
      return newAnswers;
    });
    setShowFeedback(true);
  }, [exerciseKey, setAnswers, setShowFeedback]);

  const handleClear = useCallback(() => {
    setAnswers({});
    localStorage.removeItem(`${exerciseKey}Answers`);
    setShowFeedback(false);
    setAnswersValidated(false);
  }, [exerciseKey, setAnswers, setShowFeedback, setAnswersValidated]);

  return {
    handleAnswerChange,
    handleClear,
  };
};

function ValiDelete({ onValidate, onClear, scoreCalculator }) {
  const [showScore, setShowScore] = useState(false);

  const handleValidate = () => {
    setShowScore(true);
    onValidate();
  };

  const handleClear = () => {
    setShowScore(false);
    onClear();
  };

  return (
    <div className="validelete-container">
      <div className={`score-section ${showScore ? 'visible' : ''}`}>
        {scoreCalculator}
      </div>
      <div className="buttons-section">
        <button 
          className="validate-button"
          onClick={handleValidate}
        >
          <span className="icon"></span>
          Fin de Match ✅
        </button>
        <button 
          className="clear-button"
          onClick={handleClear}
        >
          <span className="icon"></span>
          On refait le match 🗑️
        </button>
      </div>
    </div>
  );
}

export default ValiDelete;