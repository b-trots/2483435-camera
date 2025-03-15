import { RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';

const getAllProducts = (state: State) => state[SliceName.Products].allProducts;

const getPromoProducts = (state: State) => state[SliceName.Products].promoProducts;

const getCurrentProduct = (state: State) =>
  state[SliceName.Products].currentProduct;

const getIsAllProductsLoaded = (state: State): boolean =>
  state[SliceName.Products].isAllProductsLoaded;

const getIsPromoProductsLoaded = (state: State): boolean =>
  state[SliceName.Products].isPromoProductLoaded;

const getProductsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Products].requestStatus;

const getProductsError = (state: State) => state[SliceName.Products].productsError;

export {
  getAllProducts,
  getPromoProducts,
  getCurrentProduct,
  getIsAllProductsLoaded,
  getIsPromoProductsLoaded,
  getProductsRequestStatus,
  getProductsError
};
