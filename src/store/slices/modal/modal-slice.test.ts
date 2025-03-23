import { ModalStatus, ModalType } from '../../../const/const';
import {
  closeModal,
  modalSlice,
  openModal,
  setModalCameraId,
} from './modal-slice';

describe('Modal Slice', () => {
  const initialState = {
    modalType: null,
    modalStatus: ModalStatus.Close,
    modalCameraId: null,
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const result = modalSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with an empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = modalSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('openModal should set modalType and change modalStatus to Open', () => {
    const modalType = ModalType.CallItem;
    const action = openModal(modalType);
    const result = modalSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      modalType,
      modalStatus: ModalStatus.Open,
    };

    expect(result).toEqual(expectedState);
  });

  it('closeModal should reset modalType, modalStatus, and modalCameraId', () => {
    const currentState = {
      modalType: ModalType.CallItem,
      modalStatus: ModalStatus.Open,
      modalCameraId: 5,
    };

    const action = closeModal();
    const result = modalSlice.reducer(currentState, action);

    expect(result).toEqual(initialState);
  });

  it('setModalCameraId should set modalCameraId to the given value', () => {
    const cameraId = 10;
    const action = setModalCameraId(cameraId);
    const result = modalSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      modalCameraId: cameraId,
    };

    expect(result).toEqual(expectedState);
  });
});
