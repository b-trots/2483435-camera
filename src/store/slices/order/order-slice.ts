import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { OrderSlice } from '@/types/store-types/slices-types';
import { fetchOrderAction } from './order-actions';
import { BasketCamera } from '@/types/types';

const orderState: OrderSlice = {
  basket: DefaultParam.EmptyArray,
  coupon: null,
  requestStatus: RequestStatus.Idle,
  orderError: false,
};

const orderSlice = createSlice({
  name: SliceName.Order,
  initialState: orderState,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<BasketCamera>) => {
      state.basket.push(action.payload);
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
const { setRequestStatus, addCameraToBasket } = orderSlice.actions;

export { orderSlice, setRequestStatus, addCameraToBasket };
