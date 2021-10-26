import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  collectedTags: string[];
  selectedTag: string | undefined;
} = {
  collectedTags: [],
  selectedTag: undefined,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addCollectedTag: (state, { payload }: PayloadAction<string>) => {
      if (!state.collectedTags.includes(payload)) {
        return { ...state, collectedTags: [...state.collectedTags, payload] };
      } else {
        return state;
      }
    },
    removeCollectedTag: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      collectedTags: state.collectedTags.filter((tag) => tag !== payload),
    }),
    setCollectedTags: (state, { payload }: PayloadAction<string[]>) => ({
      ...state,
      collectedTags: payload,
    }),
    setSelectedTag: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => ({ ...state, selectedTag: payload }),
  },
});

export const {
  addCollectedTag,
  removeCollectedTag,
  setCollectedTags,
  setSelectedTag,
} = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
