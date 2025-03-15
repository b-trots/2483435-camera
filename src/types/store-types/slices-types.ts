import {
  Coupon,
  ModalStatus,
  ModalWindow,
  RequestStatus,
} from '../../const/const';
import { FullProduct, ProductsForStore, PromoProduct } from '../product-type';
import { ReviewsType } from '../types';

type ProductsSlice = {
  allProducts: ProductsForStore;
  promoProducts: PromoProduct[];
  currentProduct: FullProduct | null;
  isAllProductsLoaded: boolean;
  isPromoProductLoaded: boolean;
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

type OrderSlice = {
  coupon:Coupon | null;
  requestStatus: RequestStatus;
  orderError: boolean;
}

export type { ProductsSlice, ActiveSlice, ReviewsSlice, ModalSlice, OrderSlice };
