import {
  BooleanStatus,
  ModalStatus,
  ModalWindow,
  RequestStatus,
} from '../../const/const';
import { FullProduct, ProductsForStore } from '../product-type';
import { ReviewsType } from '../types';

type ProductsSlice = {
  allProducts: ProductsForStore;
  currentProduct: FullProduct | null;
  isAllProductsLoaded: BooleanStatus;
  requestStatus: RequestStatus;
  productsError: boolean;
};

type ActiveSlice = {
  productId: Pick<FullProduct, 'id'> | null;
};

type ReviewsSlice = {
  allReviews: Record<number, ReviewsType>;
  currentReviews: ReviewsType;
  requestStatus: RequestStatus;
  reviewsError: boolean;
};

type ModalSlice = {
  modalWindow: ModalWindow | null;
  modalStatus: ModalStatus;
};

export type { ProductsSlice, ActiveSlice, ReviewsSlice, ModalSlice };
