import { TabName } from '@/const/const';

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

type NewReviewType = {
  rate: number;
  name: string;
  plus: string;
  minus: string;
  comment: string;
};

type NewComment = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

type NewReviewErrorType = {
  [K in keyof NewReviewType]: boolean;
};

type NewReviewKeys = keyof NewReviewType;
type NewReviewStringFieldsKeys = Exclude<NewReviewKeys, 'rate'>;

type ReviewsForState = Record<number, ReviewsType>;

type OrderType = {
  camerasIds: number[];
  coupon: string | null;
};

type ReviewsType = ReviewType[];

type PaginationData = {
  pagesCount: number;
  pages: string[];
  currentPage: number;
};

type TabNameKey = keyof typeof TabName;
type TabNameId = (typeof TabName)[keyof typeof TabName]['id'];

type BasketCamera = {
  id: number;
  quantity: number;
};

export type {
  FocusableElements,
  ReviewType,
  ReviewsType,
  OrderType,
  PaginationData,
  ReviewsForState,
  TabNameKey,
  TabNameId,
  BasketCamera,
  NewReviewType,
  NewReviewErrorType,
  NewReviewKeys,
  NewReviewStringFieldsKeys,
  NewComment,
};
