import {
  ApiActionName,
  APIRoute,
  BemMode,
  DefaultParam,
  NameSpace,
  RequestStatus,
  ServiceParam,
  SliceName,
} from '@/const/const';
import { OrderType } from '@/types/types';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import {
  changeBasket, setRequestStatus
} from './order-slice';
import { AppDispatch, GetState, State } from '@/types/store-types/store-types';
import { QuantityButtonType } from '@/pages/basket/basket-item/quantity/quantity-button';
import { OrderSlice } from '@/types/store-types/slices-types';

const isManualInput = (action: QuantityButtonType | number): action is number =>
  action !== BemMode.Prev && action !== BemMode.Next;

const addCamera =
  (id: number) => (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState();
    const basket = state[SliceName.Order].basket;
    const isAlreadyAdded = basket.find((camera) => camera.id === id);
    if (isAlreadyAdded) {
      return;
    }
    const newBasket = [...basket, { id, quantity: DefaultParam.Unit }];
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
    const newBasket = [...basket].filter((camera)=>camera.id !== id);
    dispatch(changeBasket(newBasket));
  };

const fetchOrderAction = appCreateAsyncThunk<void, OrderType>(
  ApiActionName.FetchOrder,
  async ({ camerasIds, coupon, tel }, { dispatch, extra: api }) => {
    await api.post<OrderType>(APIRoute.Orders, { camerasIds, coupon, tel });

    setTimeout(
      () => dispatch(setRequestStatus(RequestStatus.Idle)),
      ServiceParam.RequestReturnTimer
    );
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

const saveOrderState = (orderState:OrderSlice) => {
  const serializedState = JSON.stringify(orderState);
  localStorage.setItem(NameSpace.OrderState, serializedState);
};

export { fetchOrderAction, addCamera, changeCameraQuantity, deleteCamera, loadOrderState,saveOrderState };
