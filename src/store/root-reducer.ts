import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const/const';
import { reviewsSlice } from './slices/reviews/reviews-slice';
import { modalSlice } from './slices/modal/modal-slice';
import { orderSlice } from './slices/order/order-slice';
import { camerasSlice } from './slices/cameras/cameras-slice';
import { activeSLice } from './slices/active/active-slice';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [SliceName.Cameras]: camerasSlice.reducer,
  [SliceName.Reviews]: reviewsSlice.reducer,
  [SliceName.Modal]: modalSlice.reducer,
  [SliceName.Order]: orderSlice.reducer,
  [SliceName.Active]: activeSLice.reducer,
});
