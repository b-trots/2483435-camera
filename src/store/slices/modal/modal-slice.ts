import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalStatus, ModalType, SliceName } from '../../../const/const';
import { ModalSlice } from '../../../types/store-types/slices-types';

const modalState: ModalSlice = {
  modalType: null,
  modalStatus: ModalStatus.Close,
  modalCameraId: null,
};

const modalSlice = createSlice({
  name: SliceName.Modal,
  initialState: modalState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload;
      state.modalStatus = ModalStatus.Open;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.modalStatus = ModalStatus.Close;
      state.modalCameraId = null;
    },
    setModalCameraId: (state, action: PayloadAction<number>) => {
      state.modalCameraId = action.payload;
    },
  },
});

const { openModal, closeModal, setModalCameraId } = modalSlice.actions;

export { modalSlice, openModal, closeModal, setModalCameraId };
