import {
  ModalStatus,
  ModalType,
  RequestStatus,
  SliceName,
} from '../../../const/const';
import { CamerasForState, PromoCamera } from '../../../types/camera-type';
import {
  generateAllCameras,
  generateCamerasForState,
  generateSimilarCamerasIds,
} from '../../../utils/mock';
import {
  getActiveModal,
  getModalCamera,
  getModalCameraId,
  getModalStatus,
} from './modal-selectors';

interface State {
  [SliceName.Cameras]: {
    allCameras: CamerasForState;
    currentCameraId: number | null;
    promoCameras: PromoCamera[];
    similarCamerasIds: number[];
    isAllCamerasLoaded: boolean;
    isPromoCamerasLoaded: boolean;
    isSimilarCamerasLoaded: boolean;
    requestStatus: RequestStatus;
    camerasError: boolean;
  };
  [SliceName.Modal]: {
    modalType: ModalType;
    modalStatus: ModalStatus;
    modalCameraId: number | null;
  };
}

describe('Modal Selectors', () => {
  const mockCameras = generateAllCameras(5);
  const mockAllCameras = generateCamerasForState(mockCameras);
  const currentCameraId = generateSimilarCamerasIds(mockCameras)[0];

  const state: State = {
    [SliceName.Cameras]: {
      allCameras: mockAllCameras,
      isAllCamerasLoaded: true,
      currentCameraId: currentCameraId,
      promoCameras: [],
      isPromoCamerasLoaded: true,
      similarCamerasIds: [],
      isSimilarCamerasLoaded: true,
      requestStatus: RequestStatus.Success,
      camerasError: false,
    },
    [SliceName.Modal]: {
      modalType: ModalType.CallItem,
      modalStatus: ModalStatus.Open,
      modalCameraId: 1,
    },
  };

  it('getActiveModal should return the current modal type', () => {
    const result = getActiveModal(state);
    expect(result).toBe(ModalType.CallItem);
  });

  it('getModalStatus should return the current modal status', () => {
    const result = getModalStatus(state);
    expect(result).toBe(ModalStatus.Open);
  });

  it('getModalCameraId should return the current modal camera ID', () => {
    const result = getModalCameraId(state);
    expect(result).toBe(1);
  });

  it('getModalCamera should return the camera associated with the current modal ID', () => {
    const result = getModalCamera(state);
    expect(result).toEqual(mockAllCameras[1]);
  });

  it('getModalCamera should return null if no modal camera ID is set', () => {
    const stateWithNullId = {
      ...state,
      [SliceName.Modal]: {
        ...state[SliceName.Modal],
        modalCameraId: null,
      },
    };

    const result = getModalCamera(stateWithNullId);
    expect(result).toBeNull();
  });
});
