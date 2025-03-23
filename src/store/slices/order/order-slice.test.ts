import { orderSlice, setRequestStatus } from './order-slice';
import { RequestStatus } from '../../../const/const';
import { fetchOrderAction } from './order-actions';

describe('Order Slice', () => {
  const initialState = {
    coupon: null,
    requestStatus: RequestStatus.Idle,
    orderError: false,
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };
    const result = orderSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with an empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = orderSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('setRequestStatus should set requestStatus to the given value', () => {
    const action = setRequestStatus(RequestStatus.Success);
    const result = orderSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Success,
    };

    expect(result).toEqual(expectedState);
  });


  it('should handle pending state for fetchOrderAction', () => {
    const action = { type: fetchOrderAction.pending.type };
    const result = orderSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Loading,
      orderError: false,
    };

    expect(result).toEqual(expectedState);
  });


  it('should handle fulfilled state for fetchOrderAction', () => {
    const action = { type: fetchOrderAction.fulfilled.type };
    const result = orderSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Success,
      orderError: false,
    };

    expect(result).toEqual(expectedState);
  });


  it('should handle rejected state for fetchOrderAction', () => {
    const action = { type: fetchOrderAction.rejected.type };
    const result = orderSlice.reducer(initialState, action);

    const expectedState = {
      ...initialState,
      requestStatus: RequestStatus.Failed,
      orderError: true,
    };

    expect(result).toEqual(expectedState);
  });
});
