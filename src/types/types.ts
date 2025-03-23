import { Coupon } from '../const/const';

type FocusableElements =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLDivElement;

type ReviewType = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

type ReviewsForState = Record<number, ReviewsType>;

type OrderType = {
  camerasIds: [number];
  coupon: Coupon | null;
  tel?: string;
};

type ReviewsType = ReviewType[];

type PaginationData = {
  pagesCount: number;
  pages: string[];
  currentPage: number;
};

export type {
  FocusableElements,
  ReviewType,
  ReviewsType,
  OrderType,
  PaginationData,
  ReviewsForState,
};
