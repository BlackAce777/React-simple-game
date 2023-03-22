import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gameBoardReducer from '../features/gameBoard/gameBoardSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameBoard: gameBoardReducer,
  },
});
