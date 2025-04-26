import { RequestStatus, SliceName } from '../../../const/const';
import { Cameras } from '../../../types/camera-type';
import {
  generateAllCameras,
  generatePromoCameras,
  generateSimilarCamerasIds,
} from '../../../utils/mock';
import {
  getAllCameras,
  getCamerasError,
  getCamerasRequestStatus,
  getCurrentCamera,
  getCurrentCameraId,
  getIsAllCamerasLoaded,
  getIsPromoCamerasLoaded,
  getIsSimilarCamerasLoaded,
  getPromoCameras,
  getSimilarCameras,
  getSimilarCamerasIds,
} from './cameras-selectors';

describe('Cameras Selectors', () => {
  const mockAllCameras = generateAllCameras(5);
  const mockCamera = mockAllCameras[0];
  const mockPromoCameras = generatePromoCameras(5);
  const mockSimilarCameras = generateSimilarCamerasIds(mockAllCameras);

  const state = {
    [SliceName.Cameras]: {
      allCameras: mockAllCameras,
      isAllCamerasLoaded: true,
      currentCameraId: mockCamera.id,
      promoCameras: mockPromoCameras,
      isPromoCamerasLoaded: true,
      similarCamerasIds: mockSimilarCameras,
      isSimilarCamerasLoaded: true,
      requestStatus: RequestStatus.Success,
      camerasError: false,
    },
  };

  it('getAllCameras should return allCameras', () => {
    const { allCameras } = state[SliceName.Cameras];
    const result = getAllCameras(state);
    expect(result).toEqual(allCameras);
  });

  it('getAllCameras should return an empty array if allCameras is empty', () => {
    const newState = {
      ...state,
      [SliceName.Cameras]: {
        ...state[SliceName.Cameras],
        allCameras: [],
      },
    };
    const result = getAllCameras(newState);
    expect(result).toEqual([]);
  });

  it('getIsAllCamerasLoaded should return isAllCamerasLoaded', () => {
    const { isAllCamerasLoaded } = state[SliceName.Cameras];
    const result = getIsAllCamerasLoaded(state);
    expect(result).toBe(isAllCamerasLoaded);
  });

  it('getCurrentCameraId should return currentCameraId', () => {
    const { currentCameraId } = state[SliceName.Cameras];
    const result = getCurrentCameraId(state);
    expect(result).toBe(currentCameraId);
  });

  it('getCurrentCamera should return current camera', () => {
    const { allCameras, currentCameraId } = state[SliceName.Cameras];
    const result = getCurrentCamera(state);
    const expectedResult = allCameras.find(
      (camera) => camera.id === currentCameraId
    );
    expect(result).toEqual(expectedResult);
  });

  it('getCurrentCamera should return null if currentCameraId does not exist', () => {
    const newState = {
      ...state,
      [SliceName.Cameras]: {
        ...state[SliceName.Cameras],
        currentCameraId: 99,
      },
    };
    const result = getCurrentCamera(newState);
    expect(result).toBeNull();
  });

  it('should return null when currentCameraId is null', () => {
    const testState = {
      [SliceName.Cameras]: {
        ...state[SliceName.Cameras],
        currentCameraId: null,
      },
    };

    const result = getCurrentCamera(testState);
    expect(result).toBeNull();
  });

  it('getPromoCameras should return promo cameras', () => {
    const { promoCameras } = state[SliceName.Cameras];
    const result = getPromoCameras(state);
    expect(result).toEqual(promoCameras);
  });

  it('getIsPromoCamerasLoaded should return isPromoCamerasLoaded', () => {
    const { isPromoCamerasLoaded } = state[SliceName.Cameras];
    const result = getIsPromoCamerasLoaded(state);
    expect(result).toBe(isPromoCamerasLoaded);
  });

  it('getSimilarCamerasIds should return similar cameras IDs', () => {
    const { similarCamerasIds } = state[SliceName.Cameras];
    const result = getSimilarCamerasIds(state);
    expect(result).toEqual(similarCamerasIds);
  });

  it('getSimilarCameras should return similar cameras', () => {
    const { allCameras, similarCamerasIds } = state[SliceName.Cameras];
    const result = getSimilarCameras(state);
    const expectedResult = similarCamerasIds.reduce<Cameras>((acc, id) => {
      if (allCameras[id]) {
        acc.push(allCameras[id]);
      }
      return acc;
    }, []);
    expect(result).toEqual(expectedResult);
  });

  it('getSimilarCameras should return an empty array if similarCamerasIds is empty', () => {
    const newState = {
      ...state,
      [SliceName.Cameras]: {
        ...state[SliceName.Cameras],
        similarCamerasIds: [],
      },
    };
    const result = getSimilarCameras(newState);
    expect(result).toEqual([]);
  });

  it('getIsSimilarCamerasLoaded should return isSimilarCamerasLoaded', () => {
    const { isSimilarCamerasLoaded } = state[SliceName.Cameras];
    const result = getIsSimilarCamerasLoaded(state);
    expect(result).toBe(isSimilarCamerasLoaded);
  });

  it('getCamerasRequestStatus should return requestStatus', () => {
    const { requestStatus } = state[SliceName.Cameras];
    const result = getCamerasRequestStatus(state);
    expect(result).toBe(requestStatus);
  });

  it('getCamerasError should return camerasError', () => {
    const { camerasError } = state[SliceName.Cameras];
    const result = getCamerasError(state);
    expect(result).toBe(camerasError);
  });
});
