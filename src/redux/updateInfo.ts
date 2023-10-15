import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UpdateState {
  firstName: string;
  lastName: string;
  middleName: string;
}

const initialState: UpdateState = {
  firstName: '',
  lastName: '',
  middleName: '',
};

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setMiddleName: (state, action: PayloadAction<string>) => {
      state.middleName = action.payload;
    },
  },
});

export const { setFirstName, setLastName, setMiddleName } = updateSlice.actions;

export default updateSlice.reducer;