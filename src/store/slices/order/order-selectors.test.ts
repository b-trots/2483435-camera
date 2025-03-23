import { RequestStatus, SliceName } from '../../../const/const';
import {
  getCoupon,
  getOrderError,
  getOrderRequestStatus,
} from './order-selectors';

describe('Order Selectors', () => {
  const state = {
    [SliceName.Order]: {
      coupon: null,
      requestStatus: RequestStatus.Success,
      orderError: false,
    },
  };

  it('getCoupon should return the current coupon', () => {
    const result = getCoupon(state);
    expect(result).toBe(null);
  });

  it('getOrderRequestStatus should return the current request status', () => {
    const result = getOrderRequestStatus(state);
    expect(result).toBe(RequestStatus.Success);
  });

  it('getOrderError should return the current order error state', () => {
    const result = getOrderError(state);
    expect(result).toBe(false);
  });
});
