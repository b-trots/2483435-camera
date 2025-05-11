import { ModalStatus, ModalType, RequestStatus } from '@/const/const';
import { Cameras, PromoCamera } from '../camera-type';
import { BasketCamera, ReviewsForState } from '../types';

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
  coupon: string | null;
  requestStatus: RequestStatus;
  orderError: string;
};

export type { CamerasSlice, ModalSlice, OrderSlice, ReviewsSlice };
