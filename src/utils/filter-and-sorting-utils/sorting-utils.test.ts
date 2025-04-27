import { SortOrder, SortType } from '@/const/sorting-const';
import {
  daySort,
  toSort,
  toSortCameras,
  toUpdateSorting,
} from './sorting-utils';
import { SortingType, SortingValue } from '@/types/filter-and-sort-types';
import { Cameras } from '@/types/camera-type';
import { CameraType, CameraCategory, CameraLevel } from '@/const/camera-const';

const reviewsMock = [
  {
    id: '101',
    createAt: '2024-12-31T09:25:26.612Z',
    cameraId: 1,
    userName: 'monkey',
    advantage: 'good',
    disadvantage: 'bad',
    review: 'norm',
    rating: 4,
  },
  {
    id: '102',
    createAt: '2025-01-04T09:25:26.612Z',
    cameraId: 1,
    userName: 'cat',
    advantage: 'non',
    disadvantage: 'very bad',
    review: 'very bad',
    rating: 3,
  },
  {
    id: '103',
    createAt: '2024-12-05T09:25:26.612Z',
    cameraId: 1,
    userName: 'dog',
    advantage: 'very good',
    disadvantage: 'non',
    review: 'very good',
    rating: 5,
  },
];

const camerasMock: Cameras = [
  {
    id: 1,
    name: 'Camera1',
    vendorCode: '',
    type: CameraType.Snapshot,
    category: CameraCategory.PhotoCamera,
    description: 'good camera',
    level: CameraLevel.Zero,
    price: 100,
    rating: 3,
    reviewCount: 3,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
  },
  {
    id: 2,
    name: 'Camera2',
    vendorCode: '',
    type: CameraType.Digital,
    category: CameraCategory.PhotoCamera,
    description: 'good camera',
    level: CameraLevel.Professional,
    price: 2000,
    rating: 4,
    reviewCount: 3,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
  },
  {
    id: 3,
    name: 'Camera3',
    vendorCode: '',
    type: CameraType.Collection,
    category: CameraCategory.VideoCamera,
    description: 'good camera',
    level: CameraLevel.NonProfessional,
    price: 500,
    rating: 5,
    reviewCount: 3,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
  },
];

describe('daySort', () => {
  it('should return a positive number when reviewB is newer than reviewA', () => {
    const reviewA = reviewsMock[0];
    const reviewB = reviewsMock[1];

    const result = daySort(reviewA, reviewB);
    expect(result).toBeGreaterThan(0);
  });

  it('should return a negative number when reviewA is newer than reviewB', () => {
    const reviewA = reviewsMock[1];
    const reviewB = reviewsMock[0];

    const result = daySort(reviewA, reviewB);
    expect(result).toBeLessThan(0);
  });

  it('should return 0 when reviewA and reviewB have the same date', () => {
    const reviewA = reviewsMock[0];
    const reviewB = reviewsMock[0];

    const result = daySort(reviewA, reviewB);
    expect(result).toBe(0);
  });
});

describe('toUpdateSorting', () => {
  it('should update the type to the provided SortType', () => {
    const sorting: SortingType = {
      type: SortType.SortPrice,
      order: SortOrder.Up,
    };
    const newSorting = toUpdateSorting(sorting, SortType.SortPopular);

    expect(newSorting).toEqual({
      type: SortType.SortPopular,
      order: SortOrder.Up,
    });
  });

  it('should update the order to the provided SortOrder', () => {
    const sorting: SortingType = {
      type: SortType.SortPrice,
      order: SortOrder.Up,
    };
    const newSorting = toUpdateSorting(sorting, SortOrder.Down);

    expect(newSorting).toEqual({
      type: SortType.SortPrice,
      order: SortOrder.Down,
    });
  });

  it('should return the same sorting if a value not in SortType or SortOrder is provided', () => {
    const sorting: SortingType = {
      type: SortType.SortPrice,
      order: SortOrder.Up,
    };
    const newSorting = toUpdateSorting(
      sorting,
      'someInvalidValue' as SortingValue
    );

    expect(newSorting).toEqual(sorting);
  });
});

describe('toSort', () => {
  describe('Sort by price', () => {
    it('should sort by price in ascending order when price is defined', () => {
      const cameraA = camerasMock[0];
      const cameraB = camerasMock[1];

      const result = toSort[SortType.SortPrice](cameraA, cameraB);

      expect(result).toBeLessThan(0);
    });
  });

  describe('Sort by popular', () => {
    it('should sort by rating in ascending order when rating is defined', () => {
      const cameraA = camerasMock[0];
      const cameraB = camerasMock[1];

      const result = toSort[SortType.SortPopular](cameraA, cameraB);

      expect(result).toBeLessThan(0);
    });
  });
});

describe('toSortCameras', () => {
  it('should sort cameras by price in ascending order', () => {
    const sorting = { type: SortType.SortPrice, order: SortOrder.Up };

    const result = toSortCameras(camerasMock, sorting);

    expect(result).toEqual([camerasMock[0], camerasMock[2], camerasMock[1]]);
  });

  it('should sort cameras by price in descending order', () => {
    const sorting = { type: SortType.SortPrice, order: SortOrder.Down };

    const result = toSortCameras(camerasMock, sorting);

    expect(result).toEqual([camerasMock[1], camerasMock[2], camerasMock[0]]);
  });
  it('should sort cameras by rating in ascending order', () => {
    const sorting = { type: SortType.SortPopular, order: SortOrder.Up };

    const result = toSortCameras(camerasMock, sorting);

    expect(result).toEqual([camerasMock[0], camerasMock[1], camerasMock[2]]);
  });

  it('should sort cameras by rating in descending order', () => {
    const sorting = { type: SortType.SortPopular, order: SortOrder.Down };

    const result = toSortCameras(camerasMock, sorting);

    expect(result).toEqual([camerasMock[2], camerasMock[1], camerasMock[0]]);
  });

  it('should handle empty camera array', () => {
    const sorting = { type: SortType.SortPrice, order: SortOrder.Up };

    const result = toSortCameras([], sorting);

    expect(result).toEqual([]);
  });

  it('should not mutate the original cameras array', () => {
    const sorting = { type: SortType.SortPrice, order: SortOrder.Up };
    const originalCameras = [...camerasMock];

    toSortCameras(camerasMock, sorting);

    expect(camerasMock).toEqual(originalCameras);
  });
});
