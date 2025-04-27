import { CameraType, CameraCategory, CameraLevel } from '@/const/camera-const';
import { Cameras } from '@/types/camera-type';
import { FiltersType } from '@/types/filter-and-sort-types';
import { toUpdateValidPriceRange } from './to-update-valid-price-range';

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

const mockFilters: FiltersType = {
  price: { price: null, priceUp: null },
  category: null,
  type: [],
  level: [],
};

describe('toUpdateValidPriceRange', () => {
  it('should return the correct price range without price filter', () => {
    const result = toUpdateValidPriceRange(mockFilters, camerasMock);

    expect(result).toEqual({ newMinValidPrice: 100, newMaxValidPrice: 500 });
  });

  it('should set valid price range using setValidPriceRange callback', () => {
    const mockSetValidPriceRange = vi.fn();

    toUpdateValidPriceRange(mockFilters, camerasMock, mockSetValidPriceRange);

    expect(mockSetValidPriceRange).toHaveBeenCalledWith({
      price: 100,
      priceUp: 500,
    });
  });

  it('should handle empty cameras array correct', () => {
    const result = toUpdateValidPriceRange(mockFilters, []);

    expect(result).toEqual({ newMinValidPrice: 0, newMaxValidPrice: 0 });
  });

  it('should handle null filters', () => {
    const result = toUpdateValidPriceRange(
      { ...mockFilters, price: { price: null, priceUp: null } },
      camerasMock
    );

    expect(result).toEqual({ newMinValidPrice: 100, newMaxValidPrice: 500 });
  });
});
