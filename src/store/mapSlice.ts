import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MapData, MapSliceState } from "@contracts";

const initialState: MapSliceState = { maps: [], selectedMap: null };

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMaps: (state, { payload }: PayloadAction<MapData[]>) => ({
      ...state,
      maps: payload,
    }),
    setSelectedMap: (state, { payload }: PayloadAction<MapData>) => ({
      ...state,
      selectedMap: payload,
    }),
  },
});

export const { setMaps, setSelectedMap } = mapSlice.actions;

export const mapReducer = mapSlice.reducer;
