import { faker } from '@faker-js/faker';
import { ReviewsType, ReviewType } from '@/types/types';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '@/services/api';
import { State } from '@/types/store-types/store-types';
import { Cameras, FullCamera, PromoCamera } from '@/types/camera-type';
import { CameraCategory, CameraLevel, CameraType } from '@/const/camera-const';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

const generateCamera = (): FullCamera => ({
  id: faker.number.int({ min: 1, max: 10 }),
  name: faker.commerce.productName(),
  vendorCode: faker.string.uuid(),
  type: faker.helpers.arrayElement(Object.values(CameraType)) as CameraType,
  category: faker.helpers.arrayElement(
    Object.values(CameraCategory)
  ) as CameraCategory,
  description: faker.lorem.sentence(),
  level: faker.helpers.arrayElement(Object.values(CameraLevel)) as CameraLevel,
  price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
  rating: parseFloat(faker.finance.amount({ min: 1, max: 5 })),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  previewImg: faker.image.url(),
  previewImg2x: faker.image.url(),
  previewImgWebp: faker.image.url(),
  previewImgWebp2x: faker.image.url(),
});

const generateAllCameras = (length: number): Cameras =>
  Array.from({ length: length }, generateCamera);

const generatePromoCamera = (): PromoCamera => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.commerce.productName(),
  previewImg: faker.image.urlLoremFlickr({ category: 'electronics' }),
  previewImg2x: faker.image.urlLoremFlickr({ category: 'electronics' }),
  previewImgWebp: faker.image.urlLoremFlickr({ category: 'electronics' }),
  previewImgWebp2x: faker.image.urlLoremFlickr({ category: 'electronics' }),
});

const generatePromoCameras = (length: number): PromoCamera[] =>
  Array.from({ length: length }, generatePromoCamera);

const generateSimilarCamerasIds = (cameras: Cameras) =>
  cameras.map((camera) => camera.id);

const generateReview = (cameraId: number): ReviewType => ({
  id: faker.string.uuid(),
  createAt: faker.date.past().toISOString(),
  cameraId: cameraId,
  userName: faker.person.firstName(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  review: faker.lorem.paragraph(),
  rating: faker.number.int({ min: 1, max: 5 }),
});

const generateReviewsForCameras = (
  countCamerasIds: number,
  countReviews: number
): ReviewsType[] => {
  const reviews: ReviewsType[] = [];

  for (let cameraId = 1; cameraId <= countCamerasIds; cameraId++) {
    const cameraReviews: ReviewsType = Array.from(
      { length: countReviews },
      () => generateReview(cameraId)
    );
    reviews.push(cameraReviews);
  }

  return reviews;
};

const generateReviewsForState = (
  reviews: ReviewsType[]
): Record<number, ReviewsType> => {
  const storeReviews = reviews.reduce((acc, currentReviews) => {
    const id = currentReviews[0].cameraId;

    if (!acc[id]) {
      acc[id] = [];
    }

    acc[id].push(...currentReviews);
    return acc;
  }, {} as Record<number, ReviewsType>);

  return storeReviews;
};

export {
  generateCamera,
  generateAllCameras,
  generatePromoCamera,
  generatePromoCameras,
  generateSimilarCamerasIds,
  generateReview,
  generateReviewsForCameras,
  generateReviewsForState,
  extractActionsTypes,
};
