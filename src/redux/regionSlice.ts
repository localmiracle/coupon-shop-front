import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RegionState = {
  name: string;
};

const initialState: RegionState = {
  name: "",
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setRegion } = regionSlice.actions;

export default regionSlice.reducer;
