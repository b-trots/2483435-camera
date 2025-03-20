import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { OrderSlice } from '../../../types/store-types/slices-types';
import { fetchOrderAction } from './order-actions';

const orderState: OrderSlice = {
  coupon: null,
  requestStatus: RequestStatus.Idle,
  orderError: false,
};

const orderSlice = createSlice({
  name: SliceName.Order,
  initialState: orderState,
  reducers: {
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
const { setRequestStatus } = orderSlice.actions;

export { orderSlice, setRequestStatus };
