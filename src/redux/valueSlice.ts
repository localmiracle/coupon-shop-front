import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ValuesState {
  values: string[];
}

const initialState: ValuesState = {
  values: ["", "", "", ""],
};

const valuesSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {
      setValues: (state, action: PayloadAction<string[]>) => {
        state.values = action.payload;
      },
      updateValue: (state, action: PayloadAction<{ index: number; value: string }>) => {
        const { index, value } = action.payload;
        state.values[index] = value;
      },
    },
  });

export const { setValues, updateValue } = valuesSlice.actions;
export default valuesSlice.reducer;