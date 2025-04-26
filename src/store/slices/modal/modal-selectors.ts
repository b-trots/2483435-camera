import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { getAllCameras } from '../cameras/cameras-selectors';

export type ModalState = Pick<State, SliceName.Modal>;

const getActiveModal = (state: ModalState) => state[SliceName.Modal].modalType;
const getModalStatus = (state: ModalState) =>
  state[SliceName.Modal].modalStatus;
const getModalCameraId = (state: ModalState) =>
  state[SliceName.Modal].modalCameraId;

const getModalCamera = createSelector(
  [getAllCameras, getModalCameraId],
  (allCameras, modalCameraId) =>
    modalCameraId
      ? allCameras.find((camera) => camera.id === modalCameraId)
      : null
);

export { getActiveModal, getModalStatus, getModalCameraId, getModalCamera };
