import { configureStore } from '@reduxjs/toolkit';
import scoresReducer from './scoresSlice';
const preloadedState = {
  scores: {
    doubleAnswers: {},
    moitieAnswers: {},
    ecrisAnswers: {},
    calculsAnswers: {},
    arbreCalculAnswers: {},
    trouveChiffreAnswers: {},
    savedScores: {}
  }
};
export const store = configureStore({
  reducer: {
    scores: scoresReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
