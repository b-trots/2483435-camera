import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const/const-navigate';
import { FullProduct, Products } from '../../types/product-type';
import { AxiosInstance } from 'axios';
import { ReviewsType } from '../../types/types';
import { AppDispatch, State } from '../../types/store-types/store-types';
import { NameSpace, SliceName } from '../../const/const';
import { setReviews } from '../slices/reviews/reviews-slice';
import { setCurrentProduct } from '../slices/products/products-slice';

const appCreateAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

const fetchProductsAction = appCreateAsyncThunk<Products, undefined>(
  'PRODUCTS/fetchProducts',
  async (_arg, { extra: api }) => {
    const { data: products } = await api.get<Products>(APIRoute.Products);
    return products;
  }
);

const fetchOrSetProductAction = appCreateAsyncThunk<
  FullProduct | null,
  number | string
>(
  'PRODUCTS/fetchOrSetProduct',
  async (productId, { dispatch, getState, extra: api }) => {
    const state = getState();
    const products = state[SliceName.Products].allProducts;
    const currentId = state[SliceName.Products].currentProduct?.id;

    if (currentId !== productId) {
      const activeProduct = products[+productId];

      if (!activeProduct) {
        const { data: product } = await api.get<FullProduct>(
          `${APIRoute.Products}/${productId}`
        );

        return product;
      }

      dispatch(setCurrentProduct(activeProduct));
    }

    return null;
  }
);

const fetchOrSetReviewsAction = appCreateAsyncThunk<
  ReviewsType | null,
  number | string
>(
  'REVIEWS/fetchOrSetReviews',
  async (productId, { dispatch, getState, extra: api }) => {
    const state = getState();
    const allReviews = state[SliceName.Reviews].allReviews;
    const currentId =
      state[SliceName.Reviews].currentReviews[NameSpace.FirstElement]?.cameraId;

    if (currentId !== productId) {
      const activeReviews = allReviews[+productId];

      if (!activeReviews) {
        const { data: reviews } = await api.get<ReviewsType>(
          `${APIRoute.Products}/${productId}${APIRoute.Reviews}`
        );

        return reviews;
      }

      dispatch(setReviews(activeReviews));
    }

    return null;
  }
);

export {
  fetchProductsAction,
  fetchOrSetProductAction,
  fetchOrSetReviewsAction,
};
