import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { gameReducer } from "./gameSlice";
import { tagReducer } from "./tagSlice";

export const store = configureStore({
  reducer: { game: gameReducer, tag: tagReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
