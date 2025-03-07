import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../const/const';
import { productsSlice } from './slices/products/products-slice';
import { reviewsSlice } from './slices/reviews/reviews-slice';
import { modalSlice } from './slices/modal/modal-slice';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  [SliceName.Products]: productsSlice.reducer,
  [SliceName.Reviews]: reviewsSlice.reducer,
  [SliceName.Modal]: modalSlice.reducer,
});
