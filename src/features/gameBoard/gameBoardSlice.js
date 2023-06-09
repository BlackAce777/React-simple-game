import { createSlice } from "@reduxjs/toolkit";
import { randomArrayInRange, getPossiblePoints, collapse } from "./utils";

const initialState = {
  gameBoard: randomArrayInRange(1, 5, 100),
  possiblePoints: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const gameBoardSlice = createSlice({
  name: "gameBoard",
  initialState,
  reducers: {
    initialize: (state) => {
      state.gameBoard = randomArrayInRange(1, 5, 100);
      state.possiblePoints = [];
    },
    onClick: (state, action) => {
      if (state.gameBoard[action.payload] === 0) return;
      state.gameBoard = collapse(state.gameBoard, action.payload);
      state.possiblePoints = [];
    },
    onMove: (state, action) => {
      if (state.gameBoard[action.payload] === 0) return;
      state.possiblePoints = getPossiblePoints(state.gameBoard, action.payload);
    },
  },
});

export const { initialize, onClick, onMove } = gameBoardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGameBoard = (state) => state.gameBoard.gameBoard;
export const selectPossiblePoints = (state) => state.gameBoard.possiblePoints;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default gameBoardSlice.reducer;
