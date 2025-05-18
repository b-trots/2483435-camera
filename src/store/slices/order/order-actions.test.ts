import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createAPI } from '@/services/api';
import { State } from '@/types/store-types/store-types';
import { Action } from 'redux';
import { AppThunkDispatch } from '@/utils/mock/mock';
import { APIRoute, RequestStatus } from '@/const/const';
import { fetchOrderAction } from './order-actions';
import { setRequestStatus } from './order-slice';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const axios = createAPI();
const mockAxiosAdapter = new MockAdapter(axios);
const middleware = [thunk.withExtraArgument(axios)];
const mockStoreCreator = configureMockStore<
  State,
  Action<string>,
  AppThunkDispatch
>(middleware);
let store: ReturnType<typeof mockStoreCreator>;

describe('fetchOrderAction', () => {
  beforeEach(() => {
    store = mockStoreCreator({
      ORDER: {
        requestStatus: RequestStatus.Idle,
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should dispatch correct actions when API call succeeds', async () => {
    const orderData = {
      camerasIds: [1, 2, 3],
      coupon: 'SALE10',
      tel: '+79991234567',
    };

    mockAxiosAdapter.onPost(APIRoute.Orders).reply(200);

    const promise = store.dispatch(fetchOrderAction());

    const pendingActions = store.getActions();
    expect(pendingActions[0].type).toBe(fetchOrderAction.pending.type);

    await promise;

    const fulfilledActions = store.getActions();
    expect(fulfilledActions[1].type).toBe(fetchOrderAction.fulfilled.type);

    expect(mockAxiosAdapter.history.post[0].data).toEqual(
      JSON.stringify(orderData)
    );

    expect(vi.getTimerCount()).toBe(1);

    vi.runAllTimers();

    const finalActions = store.getActions();
    expect(finalActions).toContainEqual(setRequestStatus(RequestStatus.Idle));
  });

  it('should dispatch rejected action when API call fails', async () => {

    mockAxiosAdapter.onPost(APIRoute.Orders).reply(400);

    await store.dispatch(fetchOrderAction());

    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual([
      fetchOrderAction.pending.type,
      fetchOrderAction.rejected.type,
    ]);

    expect(vi.getTimerCount()).toBe(0);
  });
});
