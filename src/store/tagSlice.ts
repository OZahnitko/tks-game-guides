import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SelectedTagType, Tag, TagSliceState } from "@contracts";

const initialState: TagSliceState = { activeTags: [], selectedTagType: null };

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setActiveTags: (state, { payload }: PayloadAction<Tag[]>) => ({
      ...state,
      activeTags: payload,
    }),
    setSelectedTagType: (
      state,
      { payload }: PayloadAction<SelectedTagType>
    ) => ({ ...state, selectedTagType: payload }),
  },
});

export const { setActiveTags, setSelectedTagType } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
