import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActivePageState {
  activePage: string;
}

const initialState: ActivePageState = {
  activePage: 'transactions',
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = activeSlice.actions;
export default activeSlice.reducer;