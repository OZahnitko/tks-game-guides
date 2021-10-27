import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Collectible, Game, Map } from "@contracts";

interface DataSliceState {
  collectibles: Collectible[];
  games: Game[];
  maps: Map[];
}

const initialState: DataSliceState = { collectibles: [], games: [], maps: [] };

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCollectibles: (state, { payload }: PayloadAction<Collectible[]>) => ({
      ...state,
      collectibles: payload,
    }),
    setGames: (state, { payload }: PayloadAction<Game[]>) => ({
      ...state,
      games: payload,
    }),
    setMaps: (state, { payload }: PayloadAction<Map[]>) => ({
      ...state,
      maps: payload,
    }),
  },
});

export const { setCollectibles, setGames, setMaps } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
