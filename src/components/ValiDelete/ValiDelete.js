import React from 'react';
import './_validelete.scss';
import { useState, useCallback, useEffect } from 'react';

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
  return (
    <div className="validelete-container">
      <div className="score-section">
        {scoreCalculator}
      </div>
      <div className="buttons-section">
        <button 
          className="validate-button"
          onClick={onValidate}
        >
          <span className="icon"></span>
          Correction ✅
        </button>
        <button 
          className="clear-button"
          onClick={onClear}
        >
          <span className="icon"></span>
          Tout effacer 🗑️
        </button>
      </div>
    </div>
  );
}

export default ValiDelete;