import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalStatus, ModalWindow, SliceName } from '../../../const/const';
import { ModalSlice } from '../../../types/store-types/slices-types';

const ModalState: ModalSlice = {
  modalWindow: null,
  modalStatus: ModalStatus.Close,
};

const modalSlice = createSlice({
  name: SliceName.Modal,
  initialState: ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalWindow>) => {
      state.modalWindow = action.payload;
      state.modalStatus = ModalStatus.Open;
    },
    closeModal: (state) => {
      state.modalWindow = null;
      state.modalStatus = ModalStatus.Close;
    },
  },
});

const { openModal, closeModal } = modalSlice.actions;

export { modalSlice, openModal, closeModal };
