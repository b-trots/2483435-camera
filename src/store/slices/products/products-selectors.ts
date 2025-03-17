import { createSelector } from '@reduxjs/toolkit';
import {
  RequestStatus,
  ServiceParam,
  SliceName,
} from '../../../const/const';
import { State } from '../../../types/store-types/store-types';
import { selectProducts } from '../../../utils/utils';

const getAllProducts = (state: State) => state[SliceName.Products].allProducts;

const getPromoProducts = (state: State) =>
  state[SliceName.Products].promoProducts;

const getSimilarProducts = (state: State) =>
  state[SliceName.Products].similarProducts;

const getCurrentProduct = (state: State) =>
  state[SliceName.Products].currentProduct;

const getIsAllProductsLoaded = (state: State): boolean =>
  state[SliceName.Products].isAllProductsLoaded;

const getIsPromoProductsLoaded = (state: State): boolean =>
  state[SliceName.Products].isPromoProductsLoaded;

const getIsSimilarProductsLoaded = (state: State): boolean =>
  state[SliceName.Products].isSimilarProductsLoaded;

const getProductsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Products].requestStatus;

const getProductsError = (state: State) =>
  state[SliceName.Products].productsError;

const getCurrentSimilarProducts = createSelector(
  [getSimilarProducts, (_state: State, currentPage: number) => currentPage],
  (similarProducts, currentPage) =>
    selectProducts(similarProducts, currentPage, ServiceParam.ItemsPerSlide)
);

export {
  getAllProducts,
  getPromoProducts,
  getSimilarProducts,
  getCurrentProduct,
  getIsAllProductsLoaded,
  getIsPromoProductsLoaded,
  getProductsRequestStatus,
  getIsSimilarProductsLoaded,
  getProductsError,
  getCurrentSimilarProducts,
};
