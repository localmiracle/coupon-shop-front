import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PhoneState ={
  phone: string;
  code: string;
  email: string; 
}

const initialState: PhoneState = {
  phone: '',
  code: '',
  email: '',
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setPhone, setCode, setEmail   } = phoneSlice.actions;

export default phoneSlice.reducer;