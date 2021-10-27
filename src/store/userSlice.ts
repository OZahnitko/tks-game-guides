import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CollectibleId,
  SelectedGameId,
  SelectedMapId,
  UserSlice,
} from "@contracts";

const initialState: UserSlice = {
  collectibles: [],
  selectedGame: undefined,
  selectedMap: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCollectible: (state, { payload }: PayloadAction<CollectibleId>) => {
      if (state.collectibles.includes(payload)) {
        return state;
      } else {
        return { ...state, collectibles: [...state.collectibles, payload] };
      }
    },
    setUserCollectibles: (
      state,
      { payload }: PayloadAction<CollectibleId[]>
    ) => ({
      ...state,
      collectibles: payload,
    }),
    setSelectedGame: (state, { payload }: PayloadAction<SelectedGameId>) => ({
      ...state,
      selectedGame: payload,
    }),
    setSelectedMap: (state, { payload }: PayloadAction<SelectedMapId>) => ({
      ...state,
      selectedMap: payload,
    }),
  },
});

export const {
  addCollectible,
  setSelectedGame,
  setSelectedMap,
  setUserCollectibles,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
