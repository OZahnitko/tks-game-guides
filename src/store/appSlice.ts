import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppSliceState, IsEditMode } from "@contracts";

const initialState: AppSliceState = { isEditMode: false };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsEditMode: (state, { payload }: PayloadAction<IsEditMode>) => ({
      ...state,
      isEditMode: payload,
    }),
  },
});

export const { setIsEditMode } = appSlice.actions;

export const appReducer = appSlice.reducer;
