import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TokenState ={
  token: string | null;
}

const initialState: TokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;