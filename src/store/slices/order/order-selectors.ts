import {
  getAllCameras
} from '@/store/slices/cameras/cameras-selectors';
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

const getTotalPrice = createSelector(
  [getAllCameras, getBasket],
  (allCameras, basket) => {
    let totalPrice = DefaultParam.ZeroValue;

    for (let i = 0; i < basket.length; i++) {
      const cameraId = basket[i].id;
      const cameraQuantity = basket[i].quantity;
      const currentCamera = allCameras.find((camera) => camera.id === cameraId);
      if (!currentCamera) {
        continue;
      }
      const cameraPrice = currentCamera.price;

      totalPrice += cameraPrice * cameraQuantity;
    }

    return totalPrice;
  }
);

export {
  getCoupon,
  getBasket,
  getOrderRequestStatus,
  getOrderError,
  getTotalQuantity,
  getTotalPrice,
};
