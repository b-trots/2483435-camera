vi.mock('../order/order-slice.ts', () => ({
  resetOrderState: vi.fn(() => ({ type: 'RESET_STATE' })),
  setRequestStatus: vi.fn(() => ({ type: 'RESET_STATUS', payload: 'idle' })),
  setOrderError: vi.fn(() => ({ type: 'SET_ORDER_ERROR' })),
  changeBasket: vi.fn(() => ({ type: 'CHANGE_BASKET' })),
  setCoupon: vi.fn(() => ({
    type: 'SET_COUPON',
    payload: { name: 'camera-333', value: 15 },
  })),
  closeModal: vi.fn(() => ({ type: 'CLOSE_MODAL' })),
  orderSlice: {
    name: 'order',
    reducer: vi.fn(),
    actions: {
      resetOrderState: vi.fn(() => ({ type: 'RESET_STATE' })),
      setOrderError: vi.fn(() => ({ type: 'SET_ORDER_ERROR' })),
      changeBasket: vi.fn(() => ({ type: 'CHANGE_BASKET' })),
      setCoupon: vi.fn(() => ({
        type: 'SET_COUPON',
        payload: { name: 'camera-333', value: '15' },
      })),
      closeModal: vi.fn(() => ({ type: 'CLOSE_MODAL' })),
      setRequestStatus: vi.fn(() => ({
        type: 'RESET_STATUS',
        payload: 'idle',
      })),
    },
    loadOrderState: vi.fn(() => ({
      basket: [],
      coupon: null,
      couponIsChecked: false,
      requestStatus: 'idle',
      orderError: '',
    })),
  },
}));

import thunk from 'redux-thunk';
import { createAPI } from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '@/utils/mock/mock';
import {
  APIRoute, ModalType,
  ServiceParam,
  SliceName
} from '@/const/const';
import {
  fetchCouponAction,
  fetchOrderAction
} from './order-actions';
import { State } from '@/types/store-types/store-types';
import { closeModal, openModal } from '../modal/modal-slice';

describe('fetchOrderAction', () => {
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
      [SliceName.Order]: {
        basket: [{ id: 1, quantity: 2 }],
        coupon: null,
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should dispatch correct sequence on success', async () => {
    mockAxiosAdapter.onPost(APIRoute.Orders).reply(200);

    const promise = store.dispatch(fetchOrderAction());

    let actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([fetchOrderAction.pending.type, openModal.type]);

    await promise;

    vi.advanceTimersByTime(ServiceParam.RequestTimeout);

    actions = extractActionsTypes(store.getActions());
    expect(actions).toEqual([
      fetchOrderAction.pending.type,
      openModal.type,
      'RESET_STATE',
      fetchOrderAction.fulfilled.type,
      openModal.type,
      'RESET_STATUS',
    ]);
  });

  it('should handle API error with all side effects', async () => {
    mockAxiosAdapter.onPost(APIRoute.Orders).networkError();

    const result = await store.dispatch(fetchOrderAction());

    expect(result.meta.requestStatus).toBe('rejected');

    vi.runAllTimers();

    const actions = store.getActions();

    const actionTypes = actions.map((action) => action.type);
    expect(actionTypes).toEqual([
      fetchOrderAction.pending.type,
      openModal.type,
      fetchOrderAction.rejected.type,
      'SET_ORDER_ERROR',
      openModal.type,
      'RESET_STATUS',
    ]);

    const modalActions = actions.filter(
      (action) => action.type === openModal.type
    );
    expect(modalActions).toHaveLength(2);

    const modalPayloads = modalActions.map(
      (action) =>
        (action as unknown as { type: string; payload: ModalType }).payload
    );

    expect(modalPayloads).toEqual([
      ModalType.CreateOrder,
      ModalType.BasketSuccess,
    ]);
  });

  it('should dispatch correct sequence on successful coupon apply', async () => {
    const couponName = 'camera-333';
    const couponValue = '15';

    mockAxiosAdapter
      .onPost(APIRoute.Coupons, { coupon: couponName })
      .reply(200, couponValue);

    await store.dispatch(fetchCouponAction(couponName));

    vi.advanceTimersByTime(3000);

    const actionTypes = extractActionsTypes(store.getActions());
    expect(actionTypes).toEqual([
      fetchCouponAction.pending.type,
      openModal.type,
      'SET_COUPON',
      fetchCouponAction.fulfilled.type,
      closeModal.type,
    ]);

    const setCouponAction = store
      .getActions()
      .find((action) => action.type === 'SET_COUPON') as {
      type: 'SET_COUPON';
      payload: { name: 'camera-333'; value: 15 };
    };
    expect(setCouponAction.payload).toEqual({
      name: couponName,
      value: 15,
    });
  });

  it('should send correct sequence when network error', async () => {
    const couponName = 'camera-333';

    mockAxiosAdapter
      .onPost(APIRoute.Coupons, { coupon: couponName })
      .networkError();

    await store.dispatch(fetchCouponAction(couponName));

    vi.advanceTimersByTime(ServiceParam.RequestTimeout);

    const actions = store.getActions();
    const actionTypes = extractActionsTypes(actions);

    expect(actionTypes).toEqual([
      fetchCouponAction.pending.type,
      openModal.type,
      fetchCouponAction.rejected.type,
      'MODAL/openModal',
    ]);

  });

  it('should handle invalid coupon with correct sequence', async () => {
    const couponName = 'invalid-coupon';

    mockAxiosAdapter
      .onPost(APIRoute.Coupons, { coupon: couponName })
      .reply(400, { message: 'Invalid coupon' });

    await store.dispatch(fetchCouponAction(couponName));

    vi.advanceTimersByTime(3000);

    const actions = store.getActions();
    const actionTypes = extractActionsTypes(actions);

    expect(actionTypes).toEqual([
      fetchCouponAction.pending.type,
      openModal.type,
      'SET_COUPON',
      fetchCouponAction.rejected.type,
      closeModal.type,
    ]);

    const setCouponAction = store
      .getActions()
      .find((action) => action.type === 'SET_COUPON') as {
      type: 'SET_COUPON';
      payload: null;
    };
    setCouponAction.payload = null;

    expect(setCouponAction?.payload).toBeNull();
  });
});
