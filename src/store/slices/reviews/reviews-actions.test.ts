import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '@/services/api';
import { State } from '@/types/store-types/store-types';
import { Action, AnyAction, DeepPartial } from 'redux';
import {
  AppThunkDispatch,
  generateReviewsForCameras,
} from '@/utils/mock/mock';
import { APIRoute } from '@/const/const';
import { fetchOrSetReviewsAction } from './reviews-actions';
import { addReviewToAllCamerasReviews } from './reviews-slice';
import { ReviewType } from '@/types/types';

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
    REVIEWS: {
      allCamerasReviews: {},
    },
  });
});

describe('fetchOrSetReviewsAction', () => {
  it('should dispatch "fetchOrSetReviewsAction.pending", "fetchOrSetReviewsAction.fulfilled" when server response 200 and reviews are not in state', async () => {
    const mockCameraId = 1;
    const mockReviews = generateReviewsForCameras(1, 4);

    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Reviews}`)
      .reply(200, mockReviews);

    await store.dispatch(fetchOrSetReviewsAction(mockCameraId));

    const emittedActions = store.getActions().map((action) => action.type);
    expect(emittedActions).toEqual([
      fetchOrSetReviewsAction.pending.type,
      addReviewToAllCamerasReviews.type,
      fetchOrSetReviewsAction.fulfilled.type,
    ]);
  });

  it('should not fetch reviews if already present in state', async () => {
    const mockCameraId = 1;
    const mockReviews = generateReviewsForCameras(1, 3);

    store = mockStoreCreator({
      REVIEWS: {
        allCamerasReviews: {
          [mockCameraId]: mockReviews as DeepPartial<ReviewType>[],
        },
      },
    });

    await store.dispatch(fetchOrSetReviewsAction(mockCameraId));

    const emittedActions = store.getActions() as AnyAction[];

    expect(emittedActions).toEqual([
      expect.objectContaining({ type: fetchOrSetReviewsAction.pending.type }),
      expect.objectContaining({ type: fetchOrSetReviewsAction.fulfilled.type }),
    ]);

    const fulfilledAction = emittedActions.find(
      (action) => action.type === fetchOrSetReviewsAction.fulfilled.type
    );
    expect(fulfilledAction?.payload).toBeUndefined();
  });

  it('should handle empty reviews response', async () => {
    const mockCameraId = 1;

    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Reviews}`)
      .reply(200, []);

    await store.dispatch(fetchOrSetReviewsAction(mockCameraId));

    const emittedActions = store.getActions().map((action) => action.type);
    expect(emittedActions).toEqual([
      fetchOrSetReviewsAction.pending.type,
      addReviewToAllCamerasReviews.type,
      fetchOrSetReviewsAction.fulfilled.type,
    ]);

    const addReviewsAction = store
      .getActions()
      .find(
        (action): action is ReturnType<typeof addReviewToAllCamerasReviews> =>
          action.type === addReviewToAllCamerasReviews.type
      );

    expect(addReviewsAction?.payload).toEqual({
      cameraId: mockCameraId,
      reviews: [],
    });
  });

  it('should dispatch "fetchOrSetReviewsAction.pending", "fetchOrSetReviewsAction.rejected" when server response 400', async () => {
    const mockCameraId = 1;

    mockAxiosAdapter
      .onGet(`${APIRoute.Cameras}/${mockCameraId}${APIRoute.Reviews}`)
      .reply(400);

    await store.dispatch(fetchOrSetReviewsAction(mockCameraId));

    const emittedActions = store.getActions().map((action) => action.type);
    expect(emittedActions).toEqual([
      fetchOrSetReviewsAction.pending.type,
      fetchOrSetReviewsAction.rejected.type,
    ]);
  });
});
