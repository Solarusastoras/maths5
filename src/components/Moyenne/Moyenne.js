import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCalculatedScore } from '../../store/scoresSlice';
import './Moyenne.scss';

function Moyenne() {
    const dispatch = useDispatch();
    const scores = useSelector(state => state.scores) || {
        doubleAnswers: {},
        moitieAnswers: {},
        ecrisAnswers: {},
        calculsAnswers: {},
        arbreCalculAnswers: {},
        trouveChiffreAnswers: {},
        savedScores: {}
    };

    const exercises = [
        {
            name: 'Tirs au But ⚽',
            key: 'doubleAnswers',
            correctAnswers: Array.from({length: 10}, (_, i) => (i + 1) * 2)
        },
        {
            name: 'Mi-Temps ⏱️',
            key: 'moitieAnswers',
            correctAnswers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => n / 2)
        },
        {
            name: 'Tactique 📋',
            key: 'ecrisAnswers',
            correctAnswers: ['un', 'deux', 'trois']
        },
        {
            name: 'Stats du Match 📊',
            key: 'calculsAnswers',
            correctAnswers: [9, 6, 18, 10, 20]
        },
        {
            name: 'Formation 4-4-2 ⚽',
            key: 'arbreCalculAnswers',
            correctAnswers: [18, 26, 19, 19]
        },
        {
            name: 'Numéros des Joueurs 👕',
            key: 'trouveChiffreAnswers',
            correctAnswers: [5, 6, 11, 6, 18, 3, 10, 24, 9, 38, 8, 4]
        },
    ];

    const getExerciseScore = (exercise) => {
        const savedScore = scores?.savedScores?.[exercise.key] ?? 0;
        return savedScore;
    };

    const handleScoreChange = (exercise, value) => {
        // Limiter la valeur entre 0 et 20
        const score = Math.min(Math.max(0, Number(value) || 0), 20);
        dispatch(saveCalculatedScore({
            exercise: exercise.key,
            score: score
        }));
    };

    const getAppreciation = (score) => {
        if (!score) return "";
        if (score >= 16) return "Champion du Monde! 🏆 🌟 ⚽";
        if (score >= 14) return "Star du Club! ⭐ 🌟 ⚽";
        if (score >= 12) return "Titulaire! 🎯 ⚽ 💪";
        if (score >= 10) return "Sur le Banc 🪑 💨";
        if (score >= 8) return "Remplaçant! 🔄 🎽";
        if (score >= 4) return "🟥 Tu es exclu 😅";
        return "Exclu du Centre de Formation! 📚 💪";
    };

    const averageScore = exercises
        .map(ex => Number(getExerciseScore(ex)))
        .reduce((acc, curr) => acc + curr, 0) / exercises.length;

    return (
        <div className="bulletin-container">
            <h2>🟨 Performance du Joueur 🟥</h2>

            <table>
                <thead>
                    <tr>
                        <th>Exercice</th>
                        <th>Note /20</th>
                        <th>Appréciation</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => {
                        const score = scores.savedScores[exercise.key] || 0;
                        return (
                            <tr key={index}>
                                <td>{exercise.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        value={score === 0 ? '' : score}
                                        onChange={(e) => handleScoreChange(exercise, e.target.value)}
                                    />
                                </td>
                                <td className={score === 0 ? 'empty-appreciation' : ''}>
                                    {getAppreciation(score)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="moyenne-generale">
                <h3>Moyenne Générale: {averageScore > 0 ? averageScore.toFixed(2) : '-'}/20</h3>
                <p className="appreciation">
                    {averageScore > 0 && `Appréciation générale: ${getAppreciation(averageScore)}`}
                </p>
            </div>
        </div>
    );
}

export default Moyenne;