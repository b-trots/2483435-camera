import {
  CameraCategory,
  CameraCategoryId,
  CameraType,
} from '@/const/camera-const';
import {
  isPriceInRange,
  matchesArrayFilter,
  matchesCategory,
  updateFilterArray,
} from './filter-utils';
import { FilterCameraType } from '@/const/filter-const';

describe('isPriceInRange', () => {
  it('should return true when price is within range', () => {
    expect(isPriceInRange(50, 30, 70)).toBe(true);
  });

  it('should return true when priceFrom is null and price is below priceTo', () => {
    expect(isPriceInRange(50, null, 70)).toBe(true);
  });

  it('should return true when priceTo is null and price is above priceFrom', () => {
    expect(isPriceInRange(50, 30, null)).toBe(true);
  });

  it('should return true when both priceFrom and priceTo are null', () => {
    expect(isPriceInRange(50, null, null)).toBe(true);
  });

  it('should return false when price is below priceFrom', () => {
    expect(isPriceInRange(20, 30, 70)).toBe(false);
  });

  it('should return false when price is above priceTo', () => {
    expect(isPriceInRange(80, 30, 70)).toBe(false);
  });

  it('should return true when price equals priceFrom', () => {
    expect(isPriceInRange(30, 30, 70)).toBe(true);
  });

  it('should return true when price equals priceTo', () => {
    expect(isPriceInRange(70, 30, 70)).toBe(true);
  });

  it('should handle edge cases with negative values correctly', () => {
    expect(isPriceInRange(-10, -20, -5)).toBe(true);
    expect(isPriceInRange(-25, -20, -5)).toBe(false);
  });

  it('should handle zero values correctly', () => {
    expect(isPriceInRange(0, -10, 10)).toBe(true);
    expect(isPriceInRange(0, null, null)).toBe(true);
    expect(isPriceInRange(0, 1, 10)).toBe(false);
  });
});

describe('matchesCategory', () => {
  it('should return true for matching category', () => {
    expect(
      matchesCategory(CameraCategory.PhotoCamera, CameraCategoryId.PhotoCamera)
    ).toBe(true);
  });

  it('should return false for non-matching category', () => {
    expect(
      matchesCategory(CameraCategory.VideoCamera, CameraCategoryId.PhotoCamera)
    ).toBe(false);
  });
});

describe('matchesArrayFilter', () => {
  it('should return true when filterValue is empty', () => {
    expect(matchesArrayFilter(CameraType.Digital, [], FilterCameraType)).toBe(
      true
    );
  });

  it('should return true when cameraValue matches one of the filterValue items', () => {
    expect(
      matchesArrayFilter(
        CameraType.Digital,
        ['digital', 'film'],
        FilterCameraType
      )
    ).toBe(true);
  });

  it('should return false when cameraValue does not match any of the filterValue items', () => {
    expect(
      matchesArrayFilter(CameraType.Digital, ['film'], FilterCameraType)
    ).toBe(false);
  });
});

describe('updateFilterArray', () => {
  it('should add filterKey to the array when checked is true', () => {
    expect(
      updateFilterArray(['collection', 'snapshot'], 'digital', true)
    ).toEqual(['collection', 'snapshot', 'digital']);
  });

  it('should remove filterKey from the array when checked is false', () => {
    expect(
      updateFilterArray(['collection', 'snapshot', 'digital'], 'digital', false)
    ).toEqual(['collection', 'snapshot']);
  });

  it('should handle an empty array correctly', () => {
    expect(updateFilterArray([], 'collection', true)).toEqual(['collection']);
    expect(updateFilterArray([], 'collection', false)).toEqual([]);
  });
});
