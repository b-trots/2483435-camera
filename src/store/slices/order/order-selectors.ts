import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { createSelector } from '@reduxjs/toolkit';

type OrderState = Pick<State, SliceName.Order>;

const getCoupon = (state: OrderState) => state[SliceName.Order].coupon;
const getBasket = (state: OrderState) => state[SliceName.Order].basket;

const getOrderRequestStatus = (state: OrderState): RequestStatus =>
  state[SliceName.Order].requestStatus;

const getOrderError = (state: OrderState) => state[SliceName.Order].orderError;

const getTotalQuantity = createSelector([getBasket], (basket) =>
  basket.reduce((acc, camera) => acc + camera.quantity, DefaultParam.ZeroValue)
);

export {
  getCoupon,
  getBasket,
  getOrderRequestStatus,
  getOrderError,
  getTotalQuantity,
};
