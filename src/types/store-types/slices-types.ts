import { ModalStatus, ModalType, RequestStatus } from '@/const/const';
import { Cameras, PromoCamera } from '../camera-type';
import { BasketCamera, Coupon, ReviewsForState } from '../types';

type CamerasSlice = {
  allCameras: Cameras;
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
  basket: BasketCamera[];
  coupon: Coupon | null;
  couponIsChecked: boolean;
  requestStatus: RequestStatus;
  orderError: string;
};

type FetchReviewsParam = {
  cameraId: number;
  needUpdate?: boolean;
};

export type {
  CamerasSlice,
  ModalSlice,
  OrderSlice,
  ReviewsSlice,
  FetchReviewsParam,
};
