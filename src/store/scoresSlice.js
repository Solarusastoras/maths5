import { createSlice } from '@reduxjs/toolkit';
const scoresSlice = createSlice({
  name: 'scores',
  initialState: {
    doubleAnswers: {},
    moitieAnswers: {},
    ecrisAnswers: {},
    calculsAnswers: {},
    arbreCalculAnswers: {},
    trouveChiffreAnswers: {},
    savedScores: {} 
  },
  reducers: {
    saveScore: (state, action) => {
      const { exercise, answers } = action.payload;
      state[`${exercise}Answers`] = answers;
    },
    // Nouveau reducer pour sauvegarder le score calculé
    saveCalculatedScore: (state, action) => {
      const { exercise, score } = action.payload;
      state.savedScores[exercise] = score;
    },
    clearScore: (state, action) => {
      const exercise = action.payload;
      state[`${exercise}Answers`] = {};
      state.savedScores[exercise] = null;
    },
    clearAllScores: (state) => {
      Object.keys(state).forEach(key => {
        state[key] = {};
      });
    }
  }
});
export const { saveScore, saveCalculatedScore, clearScore, clearAllScores } = scoresSlice.actions;
export default scoresSlice.reducer;