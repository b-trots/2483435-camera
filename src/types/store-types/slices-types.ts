import {
  Coupon,
  ModalStatus,
  ModalType,
  RequestStatus,
} from '../../const/const';
import {
  CamerasForState,
  PromoCamera,
} from '../product-type';
import { ReviewsForState, SortingDirection, SortingType } from '../types';

type CamerasSlice = {
  allCameras: CamerasForState;
  currentCameraId: number | null;
  promoCameras: PromoCamera[];
  similarCamerasIds: number[];
  isAllCamerasLoaded: boolean;
  isPromoCamerasLoaded: boolean;
  isSimilarCamerasLoaded: boolean;
  requestStatus: RequestStatus;
  camerasError: boolean;
};

type ReviewsSlice = {
  allCamerasReviews: ReviewsForState;
  requestStatus: RequestStatus;
  reviewsError: boolean;
};

type ModalSlice = {
  modalType: ModalType | null;
  modalStatus: ModalStatus;
  modalCameraId: number | null;
};

type OrderSlice = {
  coupon: Coupon | null;
  requestStatus: RequestStatus;
  orderError: boolean;
};

type ActiveSlice = {
  sortType:SortingType;
  sortDirection:SortingDirection;
}

export type {
  CamerasSlice,
  ReviewsSlice,
  ModalSlice,
  OrderSlice,
  ActiveSlice
};
