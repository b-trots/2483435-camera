import { RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';

const getCoupon = (state: State) => state[SliceName.Order].coupon;

const getOrderRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Order].requestStatus;

const getOrderError = (state: State) => state[SliceName.Order].orderError;

export { getCoupon, getOrderRequestStatus, getOrderError };
