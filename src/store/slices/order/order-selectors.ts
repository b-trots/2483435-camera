import {
  getAllCameras,
  getPromoCameras,
} from '@/store/slices/cameras/cameras-selectors';
import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { State } from '@/types/store-types/store-types';
import { createSelector } from '@reduxjs/toolkit';
import { BasketCamera } from '@/types/types';
import { applyDiscount } from '@/utils/discount-utils';

type OrderState = Pick<State, SliceName.Order>;
export type BasketItem = BasketCamera & { price: number };

const getCoupon = (state: OrderState) => state[SliceName.Order].coupon;
const getBasket = (state: OrderState) => state[SliceName.Order].basket;

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

const getTotalPriceWithDiscount = createSelector(
  [getTotalPrice, getBasketItemsWithPrice, getPromoCameras],
  (totalPrice, basket, promoCameras) => {
    const promoCamerasIds = promoCameras.map((camera) => camera.id);
    const promo: BasketItem[] = [];
    const withoutPromo = basket.filter((camera) => {
      if (promoCamerasIds.includes(camera.id)) {
        promo.push(camera);
        return false;
      }
      return true;
    });

    const withoutPromoPrice = applyDiscount(withoutPromo);
    const promoPrice = promo.reduce(
      (acc, item) => acc + item.price * item.quantity,
      DefaultParam.ZeroValue
    );

    const totalPriceWithDiscount = withoutPromoPrice + promoPrice;
    const discount = totalPrice - totalPriceWithDiscount;

    return { totalPriceWithDiscount, discount };
  }
);

export {
  getCoupon,
  getBasket,
  getOrderRequestStatus,
  getOrderError,
  getTotalQuantity,
  getTotalPrice,
  getTotalPriceWithDiscount,
};
