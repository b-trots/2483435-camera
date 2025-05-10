import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { OrderSlice } from '@/types/store-types/slices-types';
import { fetchOrderAction, loadOrderState, saveOrderState } from './order-actions';
import { BasketCamera } from '@/types/types';

const orderStateDefault: OrderSlice = {
  basket: DefaultParam.EmptyArray,
  coupon: null,
  requestStatus: RequestStatus.Idle,
  orderError: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.orderError = false;
      })
      .addCase(fetchOrderAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrderAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.orderError = true;
      });
  },
});
const { setRequestStatus, changeBasket } = orderSlice.actions;

export { orderSlice, setRequestStatus, changeBasket };
