import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCalculatedScore } from '../../store/scoresSlice';
import './_scorecalculator.scss';

function ScoreCalculator({ 
  correctAnswers = [], 
  exerciseKey = '', 
  answersValidated = false,
  compareFunction = (a, b) => a === b 
}) {
  const [score, setScore] = useState(null);
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores[`${exerciseKey}Answers`]) || {};
  const savedScore = useSelector(state => state.scores.savedScores[exerciseKey]);

  const calculateScore = () => {
    let correctCount = 0;
    
    correctAnswers.forEach((correctAnswer, index) => {
      const userAnswer = answers[`answer_${index}`];
      if (userAnswer !== undefined && userAnswer !== '' && 
          compareFunction(Number(userAnswer) || userAnswer, correctAnswer)) {
        correctCount++;
      }
    });

    const calculatedScore = correctAnswers.length > 0 
      ? (correctCount / correctAnswers.length) * 20 
      : 0;

    setScore(calculatedScore);
    dispatch(saveCalculatedScore({
      exercise: exerciseKey,
      score: calculatedScore
    }));
  };

  useEffect(() => {
    if (savedScore !== undefined) {
      setScore(savedScore);
    }
  }, [savedScore]);

  useEffect(() => {
    if (answersValidated) {
      calculateScore();
    }
  }, [answersValidated, calculateScore]);

  if (!answersValidated) return null;

  return (
    <div className="score-container">
      {score !== null && (
        <div className="score-display">
          Note : {Number(score).toFixed(2)}/20
          <div className="score-message">
            {score >= 10 ? 
              '✅ Bravo Nono ! Tu es super forte ! 🌟' : 
              '❌ Allez Nono, tu peux y arriver ! 💪'}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScoreCalculator;