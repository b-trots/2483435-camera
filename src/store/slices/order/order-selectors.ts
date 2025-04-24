import { RequestStatus, SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';

type OrderState = Pick<State, SliceName.Order>;

const getCoupon = (state: OrderState) => state[SliceName.Order].coupon;

const getOrderRequestStatus = (state: OrderState): RequestStatus =>
  state[SliceName.Order].requestStatus;

const getOrderError = (state: OrderState) => state[SliceName.Order].orderError;

export { getCoupon, getOrderRequestStatus, getOrderError };
