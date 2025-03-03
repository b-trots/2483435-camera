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
}

type ReviewsType = ReviewType[];

export type { FocusableElements, ReviewType, ReviewsType };
