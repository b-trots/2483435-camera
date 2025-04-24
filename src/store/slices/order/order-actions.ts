import {
  ApiActionName,
  APIRoute,
  RequestStatus,
  ServiceParam,
} from '@/const/const';
import { OrderType } from '@/types/types';
import { appCreateAsyncThunk } from '../cameras/cameras-actions';
import { setRequestStatus } from './order-slice';

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

export { fetchOrderAction };
