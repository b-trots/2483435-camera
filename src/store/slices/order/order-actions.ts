import {
  ApiActionName,
  APIRoute,
  DefaultParam,
  RequestStatus,
  ServiceParam,
  SliceName,
} from '@/const/const';
import { OrderType } from '@/types/types';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import { addCameraToBasket, setRequestStatus } from './order-slice';
import { AppDispatch, GetState, State } from '@/types/store-types/store-types';

const addCamera =
  (addCameraId: number) => (dispatch: AppDispatch, getState: GetState) => {
    const state: State = getState();
    const basket = state[SliceName.Order].basket;
    const isAlreadyAdded = basket.find((camera) => camera.id === addCameraId);
    if (isAlreadyAdded) {
      return;
    }
    dispatch(
      addCameraToBasket({ id: addCameraId, quantity: DefaultParam.Unit })
    );
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

export { fetchOrderAction, addCamera };
