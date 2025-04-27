import { FilterCameraPriceType } from '@/types/filter-and-sort-types';
import { toFindPriceRange } from './to-find-price-range';
import { Cameras } from '@/types/camera-type';
import { DefaultParam } from '@/const/const';
import { CameraCategory, CameraLevel, CameraType } from '@/const/camera-const';

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
    price: 200,
    rating: 3,
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
    rating: 3,
    reviewCount: 3,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
  },
];

describe('toFindPriceRange', () => {
  it('should return zero values when the cameras array is empty', () => {
    const cameras: Cameras = [];
    const expected: FilterCameraPriceType = {
      price: DefaultParam.ZeroValue,
      priceUp: DefaultParam.ZeroValue,
    };
    expect(toFindPriceRange(cameras)).toEqual(expected);
  });

  it('should return the same price for both min and max when there is one camera', () => {
    const cameras = [...camerasMock.slice(2)];
    const expected: FilterCameraPriceType = {
      price: 500,
      priceUp: 500,
    };
    expect(toFindPriceRange(cameras)).toEqual(expected);
  });

  it('should return correct min and max prices for multiple cameras', () => {
    const expected: FilterCameraPriceType = {
      price: 100,
      priceUp: 500,
    };
    expect(toFindPriceRange(camerasMock)).toEqual(expected);
  });

  it('should handle cameras with the same price correctly', () => {
    const cameras: Cameras = [
      ...camerasMock
        .slice(1, 2)
        .concat(...camerasMock.slice(1, 2), ...camerasMock.slice(1, 2)),
    ];
    const expected: FilterCameraPriceType = {
      price: 200,
      priceUp: 200,
    };
    expect(toFindPriceRange(cameras)).toEqual(expected);
  });

  it('should handle a camera array with a single camera and price of zero', () => {
    const cameras: Cameras = [{ ...camerasMock[0], price: 0 }];
    const expected: FilterCameraPriceType = {
      price: 0,
      priceUp: 0,
    };
    expect(toFindPriceRange(cameras)).toEqual(expected);
  });
});
