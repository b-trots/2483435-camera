import { ModalType, SliceName } from '../../../const/const';
import {
  AppDispatch,
  GetState,
  State,
} from '../../../types/store-types/store-types';
import { openModal, setModalCameraId } from './modal-slice';

export const handleModalOpen =
  (modalName:ModalType, cameraId: number) => (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState();
    const currentModalCameraId = state[SliceName.Modal].modalCameraId;

    if (currentModalCameraId !== cameraId) {
      dispatch(setModalCameraId(cameraId));
    }
    dispatch(openModal(modalName));
  };
