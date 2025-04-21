import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/store-types/store-types';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  generateAllCameras,
  generateCamera,
  generatePromoCameras,
} from '../../../utils/mock';
import { APIRoute, DefaultParam } from '../../../const/const';
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
      allCameras: DefaultParam.EmptyArray,
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
    expect(fetchCamerasActionFulfilled.payload).toEqual(generateAllCameras(5));
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
});

describe('fetchSimilarAction', () => {
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
});
