import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 export interface ActiveState {
  active: string;
}

const initialState: ActiveState = {
  active: 'people',
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
  },
});

export const { setActive } = activeSlice.actions;

export default activeSlice.reducer;