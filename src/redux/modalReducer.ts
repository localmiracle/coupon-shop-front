import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modalOpen: boolean;
}

const initialState: ModalState = {
  modalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { setModalOpen } = modalSlice.actions;

export default modalSlice.reducer;