import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '@/services/api';
import { State } from '@/types/store-types/store-types';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  generateAllCameras,
  generateCamera,
  generatePromoCameras,
} from '@/utils/mock/mock';
import { APIRoute } from '@/const/const';
import {
  fetchCamerasAction,
  fetchOrSetCameraAction,
  fetchPromoAction,
  fetchSimilarAction,
} from './cameras-actions';
import {
  addCameraToAllCameras,
  setAllCameras,
  setCurrentCameraId,
} from './cameras-slice';

const axios = createAPI();
const mockAxiosAdapter = new MockAdapter(axios);
const middleware = [thunk.withExtraArgument(axios)];
const mockStoreCreator = configureMockStore<
  State,
  Action<string>,
  AppThunkDispatch
>(middleware);
let store: ReturnType<typeof mockStoreCreator>;

beforeEach(() => {
  store = mockStoreCreator({
    CAMERAS: {
      allCameras: [],
      currentCameraId: null,
    },
  });
});

describe('fetchCamerasAction', () => {
  it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fulfilled" when server response 200', async () => {
    const mockCameras = generateAllCameras(5);
    mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameras);

    await store.dispatch(fetchCamerasAction());

    const emittedActions = store.getActions();
    const extractedActionsTypes = emittedActions.map((action) => action.type);

    expect(extractedActionsTypes).toEqual([
      fetchCamerasAction.pending.type,
      setAllCameras.type,
      fetchCamerasAction.fulfilled.type,
    ]);

    const fetchCamerasActionFulfilled = emittedActions[1] as ReturnType<
      typeof fetchCamerasAction.fulfilled
    >;
    expect(fetchCamerasActionFulfilled.payload).toEqual(mockCameras);
  });

  it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected" when server response 400', async () => {
    mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400);

    await store.dispatch(fetchCamerasAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.rejected.type,
    ]);
  });
});

describe('fetchOrSetCameraAction', () => {
  it('should dispatch "fetchOrSetCameraAction.pending", "fetchOrSetCameraAction.fulfilled" when server response 200 and camera is not in state', async () => {
    const mockCamera = generateCamera();
    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCamera.id}`)
      .reply(200, mockCamera);

    await store.dispatch(fetchOrSetCameraAction(mockCamera.id));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchOrSetCameraAction.pending.type,
      addCameraToAllCameras.type,
      setCurrentCameraId.type,
      fetchOrSetCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOrSetCameraAction.pending", "fetchOrSetCameraAction.fulfilled" when camera already in state', async () => {
    const mockCamera = generateCamera();
    store = mockStoreCreator({
      CAMERAS: {
        allCameras: [mockCamera],
        currentCameraId: null,
      },
    });

    await store.dispatch(fetchOrSetCameraAction(mockCamera.id));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchOrSetCameraAction.pending.type,
      setCurrentCameraId.type,
      fetchOrSetCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOrSetCameraAction.pending", "fetchOrSetCameraAction.rejected" when server response 400', async () => {
    const mockCameraId = 1;
    mockAxiosAdapter.onGet(`${APIRoute.Cameras}/${mockCameraId}`).reply(400);

    await store.dispatch(fetchOrSetCameraAction(mockCameraId));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchOrSetCameraAction.pending.type,
      fetchOrSetCameraAction.rejected.type,
    ]);
  });

  it('should only dispatch pending/fulfilled when currentId equals cameraId', async () => {
    const mockCamera = generateCamera();
    store = mockStoreCreator({
      CAMERAS: {
        allCameras: [mockCamera],
        currentCameraId: mockCamera.id,
      },
    });

    await store.dispatch(fetchOrSetCameraAction(mockCamera.id));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchOrSetCameraAction.pending.type,
      fetchOrSetCameraAction.fulfilled.type,
    ]);
  });
});

describe('fetchPromoAction', () => {
  it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fulfilled" when server response 200', async () => {
    const mockPromoCameras = generatePromoCameras(5);
    mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoCameras);

    await store.dispatch(fetchPromoAction());

    const emittedActions = store.getActions();
    const extractedActionsTypes = emittedActions.map((action) => action.type);

    expect(extractedActionsTypes).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type,
    ]);

    const fetchPromoActionFulfilled = emittedActions[1] as ReturnType<
      typeof fetchPromoAction.fulfilled
    >;
    expect(fetchPromoActionFulfilled.payload).toEqual(mockPromoCameras);
  });

  it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected" when server response 400', async () => {
    mockAxiosAdapter.onGet(APIRoute.Promo).reply(400);

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.rejected.type,
    ]);
  });

  it('should return empty array when promo is undefined', async () => {
    mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, undefined);

    const result = await store.dispatch(fetchPromoAction());

    expect(result.payload).toEqual([]);
  });

  it('should return empty array when promo is null', async () => {
    mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, null);

    const result = await store.dispatch(fetchPromoAction());

    expect(result.payload).toEqual([]);
  });
});

describe('fetchSimilarAction', () => {
  it('should dispatch "fetchSimilarAction.pending", "fetchSimilarAction.fulfilled" when server response 200', async () => {
    const mockCameraId = 1;
    const mockSimilarCameras = generateAllCameras(3);
    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Similar}`)
      .reply(200, mockSimilarCameras);

    await store.dispatch(fetchSimilarAction(mockCameraId));

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      ...mockSimilarCameras.map(() => addCameraToAllCameras.type),
      fetchSimilarAction.fulfilled.type,
    ]);

    const fulfilledAction = store
      .getActions()
      .find(
        (action) => action.type === fetchSimilarAction.fulfilled.type
      ) as ReturnType<typeof fetchSimilarAction.fulfilled>;
    expect(fulfilledAction.payload).toEqual(
      mockSimilarCameras.map((camera) => camera.id)
    );
  });

  it('should not dispatch addCameraToAllCameras if camera already exists in state', async () => {
    const existingCamera = {...generateCamera(), id:3};
    const mockSimilarCameras = [generateAllCameras(5).map((camera, index)=> ({...camera, id:index}))];

    store = mockStoreCreator({
      CAMERAS: {
        allCameras: [existingCamera],
        currentCameraId: null,
      },
    });

    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${existingCamera.id}${APIRoute.Similar}`)
      .reply(200, mockSimilarCameras);

    await store.dispatch(fetchSimilarAction(existingCamera.id));

    const addActions = store
      .getActions()
      .filter((action) => action.type === addCameraToAllCameras.type);

    expect(addActions.length).toBe(1);
  });

  it('should dispatch "fetchSimilarAction.pending", "fetchSimilarAction.rejected" when server response 400', async () => {
    const mockCameraId = 1;
    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Similar}`)
      .reply(400);

    await store.dispatch(fetchSimilarAction(mockCameraId));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.rejected.type,
    ]);
  });

  it('should handle empty similar cameras array', async () => {
    const mockCameraId = 1;
    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Similar}`)
      .reply(200, []);

    const result = await store.dispatch(fetchSimilarAction(mockCameraId));

    expect(result.payload).toEqual([]);

    const actions = store.getActions();
    expect(actions.some((action) => action.type === addCameraToAllCameras.type)).toBe(
      false
    );

    const fulfilledAction = actions.find(
      (a): a is ReturnType<typeof fetchSimilarAction.fulfilled> =>
        a.type === fetchSimilarAction.fulfilled.type
    );

    expect(fulfilledAction).toBeDefined();
    expect(fulfilledAction?.payload).toEqual([]);
  });

  it('should handle undefined similar cameras response', async () => {
    const mockCameraId = 1;
    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Similar}`)
      .reply(200, undefined);

    const result = await store.dispatch(fetchSimilarAction(mockCameraId));

    expect(result.payload).toEqual([]);

    const actions = store.getActions();
    expect(
      actions.some((action) => action.type === addCameraToAllCameras.type)
    ).toBe(false);
  });
});
