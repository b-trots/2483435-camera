import {
  Coupon,
  ModalStatus,
  ModalType,
  RequestStatus,
} from '../../const/const';
import {
  CamerasForStore,
  PromoCamera,
} from '../product-type';
import { ReviewsType } from '../types';

type CamerasSlice = {
  allCameras: CamerasForStore;
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
  allCamerasReviews: Record<number, ReviewsType>;
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

export type {
  CamerasSlice,
  ReviewsSlice,
  ModalSlice,
  OrderSlice,
};
