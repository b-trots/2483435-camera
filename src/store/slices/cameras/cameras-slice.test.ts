import { RequestStatus } from '../../../const/const';
import {
  generateAllCameras,
  generateCamera,
  generateCamerasForState,
  generatePromoCameras,
  generateSimilarCamerasIds,
} from '../../../utils/mock';
import {
  fetchCamerasAction,
  fetchPromoAction,
  fetchSimilarAction,
  fetchOrSetCameraAction,
} from './cameras-actions';
import {
  addCameraToAllCameras,
  camerasSlice,
  setAllCameras,
  setCurrentCameraId,
} from './cameras-slice';

describe('Cameras Slice', () => {
  const initialState = {
    allCameras: {},
    isAllCamerasLoaded: false,
    currentCameraId: null,
    promoCameras: [],
    isPromoCamerasLoaded: false,
    similarCamerasIds: [],
    isSimilarCamerasLoaded: false,
    requestStatus: RequestStatus.Idle,
    camerasError: false,
  };

  const camera = generateCamera();
  const cameras = generateAllCameras(4);
  const camerasForState = generateCamerasForState(cameras);
  const promoCameras = generatePromoCameras(5);
  const similarCamerasIds = generateSimilarCamerasIds(cameras);

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const result = camerasSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with an empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = camerasSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('setAllCameras should update allCameras', () => {
    const action = setAllCameras(camerasForState);
    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      allCameras: camerasForState,
    };

    expect(result).toEqual(expectedState);
  });

  it('addCameraToAllCameras should add a camera to allCameras', () => {
    const stateWithCameras = {
      ...initialState,
      allCameras: camerasForState,
    };

    const action = addCameraToAllCameras(camera);
    const result = camerasSlice.reducer(stateWithCameras, action);

    const expectedState = {
      ...stateWithCameras,
      allCameras: {
        ...camerasForState,
        [camera.id]: camera,
      },
    };

    expect(result).toEqual(expectedState);
  });

  it('addCameraToAllCameras should overwrite an existing camera if id matches', () => {
    const existingCamera = { ...camera, id: 1 };
    const updatedCamera = { ...camera, id: 1, name: 'Updated Camera' };

    const stateWithExistingCamera = {
      ...initialState,
      allCameras: { [existingCamera.id]: existingCamera },
    };

    const action = addCameraToAllCameras(updatedCamera);
    const result = camerasSlice.reducer(stateWithExistingCamera, action);

    const expectedState = {
      ...stateWithExistingCamera,
      allCameras: {
        [updatedCamera.id]: updatedCamera,
      },
    };

    expect(result).toEqual(expectedState);
  });

  it('setCurrentCameraId should update currentCameraId', () => {
    const action = setCurrentCameraId(1);
    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      currentCameraId: 1,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchCamerasAction.pending" should set "requestStatus" to "Loading" and reset "camerasError"', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchCamerasAction.pending
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Loading,
      camerasError: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchCamerasAction.fulfilled" should set "requestStatus" to "Success" and "isAllCamerasLoaded" to true', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchCamerasAction.fulfilled
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Success,
      isAllCamerasLoaded: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchCamerasAction.rejected" should set "requestStatus" to "Failed" and "camerasError" to true', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchCamerasAction.rejected
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Failed,
      camerasError: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchPromoAction.fulfilled" should set "isPromoCamerasLoaded" to true and update "promoCameras"', () => {
    const action = {
      type: fetchPromoAction.fulfilled.type,
      payload: promoCameras,
    };

    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isPromoCamerasLoaded: true,
      promoCameras,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchPromoAction.fulfilled" should handle empty array gracefully', () => {
    const action = {
      type: fetchPromoAction.fulfilled.type,
      payload: [],
    };

    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isPromoCamerasLoaded: true,
      promoCameras: [],
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchSimilarAction.fulfilled" should set "isSimilarCamerasLoaded" to true and update "similarCamerasIds"', () => {
    const action = {
      type: fetchSimilarAction.fulfilled.type,
      payload: similarCamerasIds,
    };

    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isSimilarCamerasLoaded: true,
      similarCamerasIds,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchSimilarAction.fulfilled" should handle empty payload', () => {
    const action = {
      type: fetchSimilarAction.fulfilled.type,
      payload: [],
    };

    const result = camerasSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      isSimilarCamerasLoaded: true,
      similarCamerasIds: [],
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchOrSetCameraAction.pending" should set "requestStatus" to "Loading" and reset "camerasError"', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchOrSetCameraAction.pending
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Loading,
      camerasError: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchOrSetCameraAction.fulfilled" should set "requestStatus" to "Success"', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchOrSetCameraAction.fulfilled
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Success,
    };

    expect(result).toEqual(expectedState);
  });

  it('"fetchOrSetCameraAction.rejected" should set "requestStatus" to "Failed" and "camerasError" to true', () => {
    const result = camerasSlice.reducer(
      initialState,
      fetchOrSetCameraAction.rejected
    );

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Failed,
      camerasError: true,
    };

    expect(result).toEqual(expectedState);
  });

  it('should not change state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = camerasSlice.reducer(initialState, unknownAction);
    expect(result).toEqual(initialState);
  });
});
