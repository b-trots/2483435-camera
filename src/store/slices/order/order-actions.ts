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
import { OrderType } from '@/types/types';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import { changeBasket, setOrderError, setRequestStatus } from './order-slice';
import { AppDispatch, GetState, State } from '@/types/store-types/store-types';
import { QuantityButtonType } from '@/pages/basket/basket-item/quantity/quantity-button';
import { OrderSlice } from '@/types/store-types/slices-types';
import { openModal } from '../modal/modal-slice';
import { AxiosError } from 'axios';

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
    const camerasIds = basket.map((camera) => camera.id);
    const coupon = state[SliceName.Order].coupon;
    try {
      dispatch(openModal(ModalType.Loading));
      await api.post<OrderType>(APIRoute.Orders, { camerasIds, coupon });
      dispatch(changeBasket([]));
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      dispatch(setOrderError(errorMessage));
      throw error;
    } finally {
      dispatch(openModal(ModalType.BasketSuccess));
      setTimeout(
        () => dispatch(setRequestStatus(RequestStatus.Idle)),
        ServiceParam.RequestReturnTimer
      );
    }
  }
);

const loadOrderState = () => {
  const orderState = localStorage.getItem(NameSpace.OrderState);
  if (orderState) {
    return JSON.parse(orderState) as OrderSlice;
  } else {
    return null;
  }
};

const saveOrderState = (orderState: OrderSlice) => {
  const serializedState = JSON.stringify(orderState);
  localStorage.setItem(NameSpace.OrderState, serializedState);
};

export {
  fetchOrderAction,
  addCamera,
  changeCameraQuantity,
  deleteCamera,
  loadOrderState,
  saveOrderState,
};
