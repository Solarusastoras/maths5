import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Moyenne from './components/Moyenne/Moyenne';

function App() {
  const [currentExercise, setCurrentExercise] = useState('moyenne'); // Changed from 'double' to 'moyenne'

  const handleExerciseChange = (event, exercise) => {
    event.preventDefault();
    setCurrentExercise(exercise);
  };

  const renderExercise = () => {
    switch(currentExercise) {
      case 'moyenne':
        return <Moyenne />;
      default:
        return <Moyenne />; // Changed from <Double /> to <Moyenne />
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
              className={`exercise-button ${currentExercise === 'double' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'double')}
            >
              Tirs au But 🥅
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'moitie' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'moitie')}
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
