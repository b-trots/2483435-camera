import { BooleanStatus, RequestStatus, SliceName } from '../../../const/const';
import { State } from '../../../types/store-types/store-types';

const getAllProducts = (state: State) => state[SliceName.Products].allProducts;

const getCurrentProduct = (state: State) =>
  state[SliceName.Products].currentProduct;

const getIsAllProductsLoad = (state: State): BooleanStatus =>
  state[SliceName.Products].isAllProductsLoaded;

const getProductsRequestStatus = (state: State): RequestStatus =>
  state[SliceName.Products].requestStatus;

export {
  getAllProducts,
  getCurrentProduct,
  getIsAllProductsLoad,
  getProductsRequestStatus,
};
