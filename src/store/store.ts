import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { appReducer } from "./appSlice";
import { mapReducer } from "./mapSlice";
import { tagReducer } from "./tagSlice";

export const store = configureStore({
  reducer: { app: appReducer, map: mapReducer, tag: tagReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
