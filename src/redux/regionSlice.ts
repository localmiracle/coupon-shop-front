import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RegionState = {
  name: string;
  vk: string;
  tg: string;
};

const initialState: RegionState = {
  name: "",
  vk: "",
  tg: "",
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setVK: (state, action: PayloadAction<string>) => {
      state.vk = action.payload;
    },
    setTG: (state, action: PayloadAction<string>) => {
      state.tg = action.payload;
    },
  },
});

export const { setRegion, setVK, setTG } = regionSlice.actions;

export default regionSlice.reducer;
