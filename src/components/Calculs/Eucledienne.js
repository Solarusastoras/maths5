import React, { useState, useEffect } from 'react';
import './_eucledienne.scss';
import ValiDelete from '../ValiDelete/ValiDelete';
import exerciseData from '../../data/eucledienne.json';

function Eucledienne() {
  const [reponses, setReponses] = useState({});
  const [score, setScore] = useState(0);
  const [answersValidated, setAnswersValidated] = useState(false);

  useEffect(() => {
    // Initialiser les réponses avec des valeurs vides
    const initialReponses = {};
    exerciseData.exercises.forEach(exercise => {
      exercise.questions.forEach(question => {
        initialReponses[question.id] = '';
      });
    });
    setReponses(initialReponses);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReponses(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValidate = () => {
    let newScore = 0;
    let totalQuestions = 0;

    exerciseData.exercises.forEach(exercise => {
      exercise.questions.forEach(question => {
        totalQuestions++;
        if (reponses[question.id]?.toLowerCase().replace(/\s+/g, '') === 
            question.correctAnswer.toLowerCase().replace(/\s+/g, '')) {
          newScore++;
        }
      });
    });

    const scoreSur20 = Math.round((newScore * 20) / totalQuestions);
    setScore(scoreSur20);
    setAnswersValidated(true);
  };

  const handleClear = () => {
    setReponses({});
    setScore(0);
    setAnswersValidated(false);
    document.querySelectorAll('.correct-answer').forEach(el => {
      el.classList.remove('correct-answer');
    });
  };

  const scoreCalculator = (
    <div className="score-display">
      {answersValidated && (
        <h3>
          {score < 10 ? '🔴' : score < 15 ? '⚽' : '🏆'} 
          Note: {score}/20
          {score === 20 && ' 🌟'}
        </h3>
      )}
    </div>
  );

  return (
    <div className="euclidienne">
      <h2>{exerciseData.title}</h2>

      {exerciseData.exercises.map(exercise => (
        <section key={exercise.id}>
          <h3>{exercise.title}</h3>
          {/* Ajout de l'affichage du problème */}
          {exercise.Prolem && (
            <div className="problem-statement">
              <p className="problem-text">{exercise.Prolem}</p>
            </div>
          )}
          {exercise.questions.map(question => (
            <div key={question.id}>
              <p>{question.text}</p>
              {question.type === 'textarea' ? (
                <textarea
                  name={question.id}
                  value={reponses[question.id] || ''}
                  onChange={handleChange}
                  placeholder="Écrivez votre réponse"
                />
              ) : (
                <input
                  type={question.type}
                  name={question.id}
                  value={reponses[question.id] || ''}
                  onChange={handleChange}
                  placeholder="Écrivez votre réponse"
                />
              )}
              <div className="ball"></div>
            </div>
          ))}
        </section>
      ))}

      <ValiDelete 
        onValidate={handleValidate}
        onClear={handleClear}
        scoreCalculator={scoreCalculator}
      />
    </div>
  );
}

export default Eucledienne;