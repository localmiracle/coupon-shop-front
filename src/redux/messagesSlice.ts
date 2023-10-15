import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  errors: string;
  success: string;
}

const initialState: MessagesState = {
  errors: '',
  success: '',
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<string>): void => {
      state.errors = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>): void => {
      state.success = action.payload;
    },
  },
});

export const { setErrors, setSuccess } = messagesSlice.actions;

export default messagesSlice.reducer;