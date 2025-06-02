import {
  ModalStatus,
  ModalType,
  RequestStatus,
  SliceName,
} from '@/const/const';
import { Cameras, PromoCamera } from '@/types/camera-type';
import {
  generateAllCameras,
  generateSimilarCamerasIds,
} from '@/utils/mock/mock';
import {
  getActiveModal,
  getModalCamera,
  getModalCameraId,
  getModalStatus,
} from './modal-selectors';

interface State {
  [SliceName.Cameras]: {
    allCameras: Cameras;
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
  const mockAllCameras = generateAllCameras(5);
  const currentCameraId = generateSimilarCamerasIds(mockAllCameras)[0];

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
      modalType: ModalType.AddItem,
      modalStatus: ModalStatus.Open,
      modalCameraId: 1,
    },
  };

  it('getActiveModal should return the current modal type', () => {
    const result = getActiveModal(state);
    expect(result).toBe(ModalType.AddItem);
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
    const { allCameras } = state[SliceName.Cameras];
    const { modalCameraId } = state[SliceName.Modal];
    const result = getModalCamera(state);
    const expectedResult = allCameras.find(
      (camera) => camera.id === modalCameraId
    );
    expect(result).toEqual(expectedResult);
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
