import {
  FilterNameRus,
  FiltersType,
  FiltersValues,
} from '@/types/filter-and-sort-types';
import { isFilterChecked } from './is-filter-checked';
import {
  FilterCameraCategory,
  FilterCameraLevel,
  FilterCameraPrice,
  FilterCameraType,
  FilterName,
} from '@/const/filter-const';
import { CameraTypeId } from '@/const/camera-const';

describe('isFilterChecked', () => {
  const filtersMock: FiltersType = {
    price: { price: null, priceUp: null },
    category: FilterCameraCategory.Photocamera.id,
    type: [FilterCameraType.Film.id, FilterCameraType.Digital.id],
    level: [
      FilterCameraLevel.Professional.id,
      FilterCameraLevel['Non-professional'].id,
    ],
  };

  it('should return false when filterName is price', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Price.name,
        FilterCameraPrice.Price.id
      )
    ).toBe(false);
  });

  it('should return true when category matches the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Category.name,
        FilterCameraCategory.Photocamera.id
      )
    ).toBe(true);
  });

  it('should return false when category does not match the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Category.name,
        FilterCameraCategory.Videocamera.id
      )
    ).toBe(false);
  });

  it('should return true when type includes the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Type.name,
        FilterCameraType.Digital.id
      )
    ).toBe(true);
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Type.name,
        FilterCameraType.Film.id
      )
    ).toBe(true);
  });

  it('should return false when type does not include the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Type.name,
        FilterCameraType.Collection.id
      )
    ).toBe(false);
  });

  it('should return false when filters[FilterName.Type.id] is undefined', () => {
    const incompleteFiltersMock: FiltersType = {
      ...filtersMock,
      type: undefined as unknown as CameraTypeId[],
    };

    expect(
      isFilterChecked(
        incompleteFiltersMock,
        FilterName.Type.name,
        'anyType' as CameraTypeId
      )
    ).toBe(false);
  });

  it('should return true when level includes the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Level.name,
        FilterCameraLevel.Professional.id
      )
    ).toBe(true);
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Level.name,
        FilterCameraLevel['Non-professional'].id
      )
    ).toBe(true);
  });

  it('should return false when level does not include the value', () => {
    expect(
      isFilterChecked(
        filtersMock,
        FilterName.Level.name,
        FilterCameraLevel.Zero.id
      )
    ).toBe(false);
  });

  it('should return false for unknown filterName', () => {
    expect(
      isFilterChecked(
        filtersMock,
        'UnknownFilter' as unknown as FilterNameRus,
        'anyValue' as unknown as FiltersValues
      )
    ).toBe(false);
  });
});
