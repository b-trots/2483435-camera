import { RequestStatus, SliceName } from '@/const/const';
import {
  getCoupon,
  getOrderError,
  getOrderRequestStatus,
} from './order-selectors';

describe('Order Selectors', () => {
  const state = {
    [SliceName.Order]: {
      basket: [],
      couponIsChecked:true,
      coupon: null,
      requestStatus: RequestStatus.Success,
      orderError: '',
    },
  };

  it('getCoupon should return null if no coupon is entered', () => {
    const result: null = getCoupon(state) as null;
    expect(result).toBe(null);
  });

  it('getOrderRequestStatus should return the current request status', () => {
    const result = getOrderRequestStatus(state);
    expect(result).toBe(RequestStatus.Success);
  });

  it('getOrderError should return the current order error state', () => {
    const result = getOrderError(state);
    expect(result).toBe('');
  });
});
