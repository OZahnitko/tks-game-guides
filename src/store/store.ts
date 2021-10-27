import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { dataReducer } from "./dataSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
  reducer: { data: dataReducer, user: userReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
