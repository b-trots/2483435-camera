import {
  getAllCameras,
  getPromoCamerasIds,
} from '@/store/slices/cameras/cameras-selectors';
import {
  DefaultParam,
  DiscountParam,
  RequestStatus,
  SliceName,
} from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { createSelector } from '@reduxjs/toolkit';
import { BasketCamera } from '@/types/types';
import { applyDiscount } from '@/utils/discount-utils';

type OrderState = Pick<State, SliceName.Order>;
export type BasketItem = BasketCamera & { price: number };

const getCoupon = (state: OrderState) => state[SliceName.Order].coupon;
const getBasket = (state: OrderState) => state[SliceName.Order].basket;
const getCouponIsChecked = (state: OrderState) =>
  state[SliceName.Order].couponIsChecked;

const getOrderRequestStatus = (state: OrderState): RequestStatus =>
  state[SliceName.Order].requestStatus;

const getOrderError = (state: OrderState) => state[SliceName.Order].orderError;

const getTotalQuantity = createSelector([getBasket], (basket) =>
  basket.reduce((acc, camera) => acc + camera.quantity, DefaultParam.ZeroValue)
);

const getBasketItemsWithPrice = createSelector(
  [getAllCameras, getBasket],
  (allCameras, basket) => {
    const basketItemsWithPrice: BasketItem[] = [];

    for (let i = 0; i < basket.length; i++) {
      const cameraId = basket[i].id;
      const currentCamera = allCameras.find((camera) => camera.id === cameraId);
      if (!currentCamera) {
        continue;
      }
      basketItemsWithPrice.push({ ...basket[i], price: currentCamera.price });
    }

    return basketItemsWithPrice;
  }
);

const getTotalPrice = createSelector(
  [getBasketItemsWithPrice],
  (basketWithPrice) =>
    basketWithPrice.reduce(
      (acc, item) => acc + item.price * item.quantity,
      DefaultParam.ZeroValue
    )
);

const getCouponDiscount = createSelector(
  [getBasketItemsWithPrice, getCoupon],
  (basketWithPrice, coupon) => {
    const totalPrice = basketWithPrice.reduce(
      (acc, item) => acc + item.price * item.quantity,
      DefaultParam.ZeroValue
    );

    if (!coupon) {
      return DefaultParam.ZeroValue;
    }

    const couponDiscount =
      totalPrice * (coupon.value / DiscountParam.PercentScale);
    return couponDiscount;
  }
);

const getTotalPriceWithDiscountAndCoupon = createSelector(
  [
    getBasketItemsWithPrice,
    getPromoCamerasIds,
    getCouponDiscount,
    getTotalPrice,
  ],
  (basket, promoCamerasIds, couponDiscount, totalPrice) => {
    const promoCameras: BasketItem[] = [];
    const regularCameras = basket.filter((camera) => {
      if (promoCamerasIds.includes(camera.id)) {
        promoCameras.push(camera);
        return false;
      }
      return true;
    });

    const regularCamerasWithDiscountTotalPrice = applyDiscount(regularCameras);

    const promoCamerasPrice = promoCameras.reduce(
      (acc, camera) => acc + camera.price * camera.quantity,
      DefaultParam.ZeroValue
    );

    const totalPriceWithDiscount =
      regularCamerasWithDiscountTotalPrice + promoCamerasPrice;

    let totalPriceWithDiscountAndCoupon: number | string =
      totalPriceWithDiscount;

    if (couponDiscount) {
      totalPriceWithDiscountAndCoupon = totalPriceWithDiscount - couponDiscount;
    }

    const discount = totalPrice - totalPriceWithDiscountAndCoupon;

    return { totalPriceWithDiscountAndCoupon, discount };
  }
);

export {
  getCoupon,
  getBasket,
  getOrderRequestStatus,
  getOrderError,
  getTotalQuantity,
  getTotalPrice,
  getTotalPriceWithDiscountAndCoupon,
  getCouponIsChecked,
};
