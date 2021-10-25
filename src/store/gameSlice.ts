import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  selectedGame: string | undefined;
  selectedMap: string | undefined;
} = {
  selectedGame: undefined,
  selectedMap: undefined,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectedGame: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      selectedGame: payload,
    }),
    setSelectedMap: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      selectedMap: payload,
    }),
  },
});

export const { setSelectedGame, setSelectedMap } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
