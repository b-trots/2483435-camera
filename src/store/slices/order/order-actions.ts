import {
  ApiActionName,
  APIRoute,
  BemMode,
  DefaultParam,
  ModalType,
  NameSpace,
  RequestStatus,
  ServiceParam,
  SliceName,
} from '@/const/const';
import { CouponName, OrderType } from '@/types/types';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import {
  changeBasket,
  resetOrderState,
  setCoupon,
  setOrderError,
  setRequestStatus,
} from './order-slice';
import { AppDispatch, GetState, State } from '@/types/store-types/store-types';
import { QuantityButtonType } from '@/pages/basket/basket-item/quantity/quantity-button';
import { OrderSlice } from '@/types/store-types/slices-types';
import { closeModal, openModal } from '../modal/modal-slice';
import { AxiosError } from 'axios';
import { isOrderData } from '@/utils/utils';

const isManualInput = (action: QuantityButtonType | number): action is number =>
  action !== BemMode.Prev && action !== BemMode.Next;

const addCamera =
  (id: number) => (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState();
    const basket = state[SliceName.Order].basket;
    let isAlreadyAdded = false;
    let newBasket = basket.map((camera) => {
      if (camera.id === id) {
        const currentQuantity = camera.quantity;
        const newQuantity =
          currentQuantity < ServiceParam.MaxQuantity
            ? currentQuantity + ServiceParam.QuantityStep
            : currentQuantity;
        camera = { ...camera, quantity: newQuantity };
        isAlreadyAdded = true;
      }
      return camera;
    });

    if (!isAlreadyAdded) {
      newBasket = [...basket, { id, quantity: DefaultParam.Unit }];
    }
    dispatch(changeBasket(newBasket));
  };

const changeCameraQuantity =
  (id: number, action: QuantityButtonType | number) =>
    (dispatch: AppDispatch, getState: GetState) => {
      const state: State = getState();
      const basket = state[SliceName.Order].basket;
      const newBasket = [...basket];
      for (let i = 0; i < newBasket.length; i++) {
        if (newBasket[i].id === id) {
          const currentCamera = newBasket[i];

          const quantity = currentCamera.quantity;
          let newQuantity = quantity;

          if (isManualInput(action)) {
            if (action < ServiceParam.MinQuantity) {
              newQuantity = ServiceParam.MinQuantity;
            } else if (action > ServiceParam.MaxQuantity) {
              newQuantity = ServiceParam.MaxQuantity;
            } else {
              newQuantity = action;
            }
          } else {
            if (action === BemMode.Prev && quantity > ServiceParam.MinQuantity) {
              newQuantity = quantity - ServiceParam.QuantityStep;
            } else if (
              action === BemMode.Next &&
              quantity < ServiceParam.MaxQuantity
            ) {
              newQuantity = quantity + ServiceParam.QuantityStep;
            } else {
              return;
            }
          }
          newBasket[i] = { ...currentCamera, quantity: newQuantity };
          dispatch(changeBasket(newBasket));
        }
      }
    };

const deleteCamera =
  (id: number) => (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState();
    const basket = state[SliceName.Order].basket;
    const newBasket = [...basket].filter((camera) => camera.id !== id);
    dispatch(changeBasket(newBasket));
  };

const fetchOrderAction = appCreateAsyncThunk<void, undefined>(
  ApiActionName.FetchOrder,
  async (_arg, { dispatch, getState, extra: api }) => {
    const state: State = getState();
    const basket = state[SliceName.Order].basket;
    if (basket.length === DefaultParam.ZeroValue) {
      return;
    }
    const camerasIds = basket.reduce<number[]>(
      (acc, camera) =>
        acc.concat([
          ...Array.from({ length: camera.quantity }, () => camera.id),
        ]),
      []
    );
    const coupon = state[SliceName.Order].coupon?.name || null;
    try {
      dispatch(openModal(ModalType.CreateOrder));
      await api.post<OrderType>(APIRoute.Orders, { camerasIds, coupon });
      dispatch(resetOrderState());
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      setTimeout(
        () => dispatch(setOrderError(errorMessage)),
        ServiceParam.RequestTimeout
      );
      throw error;
    } finally {
      setTimeout(() => {
        dispatch(openModal(ModalType.BasketSuccess));
        dispatch(setRequestStatus(RequestStatus.Idle));
      }, ServiceParam.RequestTimeout);
    }
  }
);

const loadOrderState = (): OrderSlice | null => {
  try {
    const orderState = localStorage.getItem(NameSpace.OrderState);
    if (orderState && isOrderData(orderState)) {
      return JSON.parse(orderState) as OrderSlice;
    }
    return null;
  } catch {
    return null;
  }
};

const saveOrderState = (orderState: OrderSlice) => {
  const serializedState = JSON.stringify(orderState);
  localStorage.setItem(NameSpace.OrderState, serializedState);
};

const deleteOrderState = () => {
  localStorage.removeItem(NameSpace.OrderState);
};

const fetchCouponAction = appCreateAsyncThunk<void, CouponName>(
  ApiActionName.FetchCoupon,
  async (couponName, { dispatch, extra: api }) => {
    try {
      dispatch(openModal(ModalType.CheckCoupon));
      const { data: couponValue } = await api.post<CouponName>(
        APIRoute.Coupons,
        {
          coupon: couponName,
        },
        {
          suppressErrorNotify: true,
        }
      );
      dispatch(setCoupon({ name: couponName, value: Number(couponValue) }));
    } catch (error) {
      if ((error as AxiosError).message === NameSpace.ErrorNetwork) {
        setTimeout(
          () => dispatch(openModal(ModalType.Error)),
          ServiceParam.RequestTimeout
        );
        throw error;
        return;
      }
      dispatch(setCoupon(null));
      throw error;
    } finally {
      setTimeout(() => dispatch(closeModal()), 3000);
    }
  }
);

export {
  fetchOrderAction,
  addCamera,
  changeCameraQuantity,
  deleteCamera,
  loadOrderState,
  saveOrderState,
  deleteOrderState,
  fetchCouponAction,
  isManualInput,
};
