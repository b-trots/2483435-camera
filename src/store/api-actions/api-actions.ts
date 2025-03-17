import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FullProduct,
  Products,
  ProductsForStore,
  PromoProduct,
} from '../../types/product-type';
import { AxiosInstance } from 'axios';
import { OrderType, ReviewsType } from '../../types/types';
import { AppDispatch, State } from '../../types/store-types/store-types';
import {
  ApiActionName,
  APIRoute,
  NameSpace,
  SliceName,
} from '../../const/const';
import { setReviews } from '../slices/reviews/reviews-slice';
import { setCurrentProduct } from '../slices/products/products-slice';

const appCreateAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

const fetchProductsAction = appCreateAsyncThunk<ProductsForStore, undefined>(
  ApiActionName.FetchProducts,
  async (_arg, { extra: api }) => {
    const { data: products } = await api.get<Products>(APIRoute.Products);

    const formatAllProducts = products.reduce<Record<number, FullProduct>>(
      (acc, product) => {
        acc[product.id] = product;
        return acc;
      },
      {}
    );
    return formatAllProducts;
  }
);

const fetchPromoAction = appCreateAsyncThunk<PromoProduct[], undefined>(
  ApiActionName.FetchPromo,
  async (_arg, { extra: api }) => {
    const { data: promo } = await api.get<PromoProduct[]>(APIRoute.Promo, {
      suppressErrorNotify: true,
    });
    return promo;
  }
);

const fetchOrSetProductAction = appCreateAsyncThunk<
  FullProduct | null,
  number | string
>(
  ApiActionName.FetchProduct,
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
  ApiActionName.FetchReviews,
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

const fetchSimilarAction = appCreateAsyncThunk<Products, number | string>(
  ApiActionName.FetchSimilar,
  async (productId, { extra: api }) => {
    const { data: similarProducts } = await api.get<Products>(
      `${APIRoute.Products}/${productId}${APIRoute.Similar}`,
      {
        suppressErrorNotify: true,
      }
    );

    return similarProducts;
  }
);

const fetchOrderAction = appCreateAsyncThunk<void, OrderType>(
  ApiActionName.FetchOrder,
  async ({ camerasIds, coupon, tel }, { extra: api }) => {
    await api.post<OrderType>(APIRoute.Orders, { camerasIds, coupon, tel });
  }
);

export {
  fetchProductsAction,
  fetchPromoAction,
  fetchOrSetProductAction,
  fetchOrSetReviewsAction,
  fetchSimilarAction,
  fetchOrderAction,
};
