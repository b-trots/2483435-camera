import { createSelector } from '@reduxjs/toolkit';
import { SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { getAllCameras } from '../cameras/cameras-selectors';

const getActiveModal = (state: State) => state[SliceName.Modal].modalType;
const getModalStatus = (state: State) => state[SliceName.Modal].modalStatus;

const getModalCameraId = (state: State) =>
  state[SliceName.Modal].modalCameraId;

const getModalCamera = createSelector(
  [getAllCameras, getModalCameraId],
  (allCameras, modalCameraId) =>
    modalCameraId ? allCameras[modalCameraId] : null
);

export { getActiveModal, getModalStatus, getModalCameraId, getModalCamera };
