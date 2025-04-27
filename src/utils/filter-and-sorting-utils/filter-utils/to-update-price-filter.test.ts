import { CameraCategory, CameraLevel, CameraType } from '@/const/camera-const';
import { toUpdatePriceFilter } from './to-update-price-filter';
import { FilterCameraPrice } from '@/const/filter-const';
import { FiltersType } from '@/types/filter-and-sort-types';
import { Cameras } from '@/types/camera-type';

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

describe('toUpdatePriceFilter', () => {
  const validPriceRange = { price: 100, priceUp: 500 };

  it('should set price to null when value is empty', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.Price.id,
      value: '',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: null, priceUp: null });
  });

  it('should set price to the minimum valid price if value is below the range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.Price.id,
      value: '20',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: 100, priceUp: null });
  });

  it('should set price to the maximum valid price if value is above the range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.Price.id,
      value: '3500',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: 500, priceUp: 500 });
  });

  it('should set priceUp to null when value is empty', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.PriceUp.id,
      value: '',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: null, priceUp: null });
  });

  it('should set priceUp to the maximum valid price if value is above the range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.PriceUp.id,
      value: '3500',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: null, priceUp: 500 });
  });

  it('should set priceUp to the minimum valid price if value is below the range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.PriceUp.id,
      value: '20',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: 100, priceUp: 100 });
  });

  it('should update price within the valid range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.Price.id,
      value: '300',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: 300, priceUp: null });
  });

  it('should update priceUp within the valid range', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.PriceUp.id,
      value: '400',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters },
    });

    expect(updatedFilters).toEqual({ price: null, priceUp: 400 });
  });

  it('should update price and priceUp correctly when priceValue exceeds filterMaxPrice but is within newMaxValidPrice', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.Price.id,
      value: '450',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters, price: { price: null, priceUp: 400 } },
    });

    expect(updatedFilters).toEqual({ price: 450, priceUp: 450 });
  });

  it('should update price and priceUp correctly when priceValue is below filterMinPrice but is within newMinValidPrice', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: FilterCameraPrice.PriceUp.id,
      value: '50',
      minValidPrice: validPriceRange.price,
      maxValidPrice: validPriceRange.priceUp,
      cameras: camerasMock,
      updatedFilters: { ...mockFilters, price: { price: 100, priceUp: null } },
    });

    expect(updatedFilters).toEqual({ price: 100, priceUp: 100 });
  });

  it('should return filters unchanged for unsupported name', () => {
    const updatedFilters = toUpdatePriceFilter({
      name: 'UnknownFilter',
      value: '100',
      minValidPrice: 100,
      maxValidPrice: 500,
      cameras: camerasMock,
      updatedFilters: mockFilters,
    });

    expect(updatedFilters).toEqual(mockFilters.price);
  });
});
