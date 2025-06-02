import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { handleModalOpen } from './modal-actions';
import { setModalCameraId, openModal } from './modal-slice';
import { State } from '@/types/store-types/store-types';
import { Action } from '@reduxjs/toolkit';
import { ModalType } from '@/const/const';

const middlewares = [thunk];
const mockStore = configureMockStore<State, Action>(middlewares);

describe('handleModalOpen', () => {
  it('should dispatch setModalCameraId and openModal if cameraId is different', () => {
    const store = mockStore({
      MODAL: {
        modalCameraId: null,
      },
    });

    const modalName = ModalType.AddItem;
    const cameraId = 1;

    store.dispatch(handleModalOpen(modalName, cameraId) as unknown as Action);

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: setModalCameraId.type, payload: cameraId },
      { type: openModal.type, payload: modalName },
    ]);
  });

  it('should not dispatch setModalCameraId if cameraId is the same', () => {
    const cameraId = 1;
    const store = mockStore({
      MODAL: {
        modalCameraId: cameraId,
      },
    });

    const modalName = ModalType.AddItem;

    store.dispatch(handleModalOpen(modalName, cameraId) as unknown as Action);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: openModal.type, payload: modalName }]);
  });
});
