import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { OrderSlice } from '@/types/store-types/slices-types';
import {
  fetchOrderAction,
  loadOrderState,
  saveOrderState,
} from './order-actions';
import { BasketCamera } from '@/types/types';
type ErrorType = string;

const orderStateDefault: OrderSlice = {
  basket: [],
  coupon: null,
  requestStatus: RequestStatus.Idle,
  orderError: DefaultParam.EmptyString,
};

const safeState = loadOrderState();
const orderState: OrderSlice = safeState ? safeState : orderStateDefault;

const orderSlice = createSlice({
  name: SliceName.Order,
  initialState: orderState,
  reducers: {
    changeBasket: (state, action: PayloadAction<BasketCamera[]>) => {
      state.basket = action.payload;
      saveOrderState(state);
    },
    setRequestStatus: (state, action: PayloadAction<RequestStatus>) => {
      state.requestStatus = action.payload;
    },
    setOrderError: (state, action: PayloadAction<ErrorType>) => {
      state.orderError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.orderError = DefaultParam.EmptyString;
      })
      .addCase(fetchOrderAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrderAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});
const { setRequestStatus, changeBasket, setOrderError } = orderSlice.actions;

export { orderSlice, setRequestStatus, changeBasket, setOrderError };
