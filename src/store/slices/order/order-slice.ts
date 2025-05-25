import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultParam, RequestStatus, SliceName } from '@/const/const';
import { OrderSlice } from '@/types/store-types/slices-types';
import {
  fetchCouponAction,
  fetchOrderAction,
  loadOrderState,
  saveOrderState,
} from './order-actions';
import { BasketCamera, Coupon } from '@/types/types';
type ErrorType = string;

const orderStateDefault: OrderSlice = {
  basket: [],
  coupon: null,
  couponIsChecked: false,
  requestStatus: RequestStatus.Idle,
  orderError: DefaultParam.EmptyString,
};

const savedState = loadOrderState();
const orderState: OrderSlice = savedState ? savedState : orderStateDefault;

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
    setCoupon: (state, action: PayloadAction<Coupon | null>) => {
      state.coupon = action.payload;
      saveOrderState(state);
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
      })
      .addCase(fetchCouponAction.pending, (state) => {
        state.couponIsChecked = false;
      })
      .addCase(fetchCouponAction.fulfilled, (state) => {
        state.couponIsChecked = true;
      })
      .addCase(fetchCouponAction.rejected, (state) => {
        state.couponIsChecked = true;
      });
  },
});
const { setRequestStatus, changeBasket, setOrderError, setCoupon } =
  orderSlice.actions;

export { orderSlice, setRequestStatus, changeBasket, setOrderError, setCoupon };
