import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, SliceName } from '../../../const/const';
import { OrderSlice } from '../../../types/store-types/slices-types';
import { fetchOrderAction } from '../../api-actions/api-actions';

const orderState: OrderSlice = {
  coupon: null,
  requestStatus: RequestStatus.Idle,
  orderError: false,
};

const orderSlice = createSlice({
  name: SliceName.Order,
  initialState: orderState,
  reducers: {},
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

export { orderSlice };
