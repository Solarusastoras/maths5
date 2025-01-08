import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Moyenne from './components/Moyenne/Moyenne';
import Eucledienne from './components/Calculs/Eucledienne';

function App() {
  const [currentExercise, setCurrentExercise] = useState('moyenne'); // Changed from 'double' to 'moyenne'

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const root = document.createElement('div');
      root.style.cssText = `
        position: fixed;
        bottom: 16px;
        right: 16px;
        background: #ff6b6b;
        color: white;
        padding: 12px;
        border-radius: 4px;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      
      if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        root.textContent = 'Installez React DevTools pour une meilleure expérience de développement';
        document.body.appendChild(root);
        
        setTimeout(() => {
          document.body.removeChild(root);
        }, 5000);
      }
    }
  }, []);

  const handleExerciseChange = (event, exercise) => {
    event.preventDefault();
    setCurrentExercise(exercise);
  };

  const renderExercise = () => {
    switch(currentExercise) {
      case 'moyenne':
        return <Moyenne />;
      case 'Eucledienne':
        return <Eucledienne />;
      default:
        return <Moyenne />; 
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>⚽ L'Académie de Foot des Maths en 5 ème 🏆</h1>
        
        <div className="exercise-buttons">
          <button 
            className={`bulletin-button ${currentExercise === 'moyenne' ? 'active' : ''}`}
            onClick={(event) => handleExerciseChange(event, 'moyenne')}
          >
            Performance du Joueur 📋
          </button>
          
          <div className="other-exercises">
            <button 
              className={`exercise-button ${currentExercise === 'Eucledienne' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'Eucledienne')}
            >
              Tirs au But 🥅
              Eucledienne 

            </button>
            <button 
              className={`exercise-button ${currentExercise === 'double' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'double')}
            >
              Mi-Temps ⚡
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'ecris' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'ecris')}
            >
              Stratégie 🎯
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'calculs' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'calculs')}
            >
              Stats Match 📊
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'arbre' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'arbre')}
            >
              Formation 442 ⭐
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'trouve' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'trouve')}
            >
              Maillots 👕
            </button>
          </div>
        </div>

        {renderExercise()}
      </div>
    </Provider>
  );
}

export default App;
