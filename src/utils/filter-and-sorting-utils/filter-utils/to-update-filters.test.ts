import {
  FilterCameraCategory,
  FilterCameraLevel,
  FilterCameraType,
} from '@/const/filter-const';
import {
  FilterCameraPriceType,
  FiltersType,
} from '@/types/filter-and-sort-types';
import { toUpdateFilters } from './to-update-filters';
import { Cameras } from '@/types/camera-type';
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

describe('toUpdateFilters', () => {
  const mockFilters: FiltersType = {
    price: { price: null, priceUp: null },
    category: null,
    type: [],
    level: [],
  };

  const validPriceRange: FilterCameraPriceType = { price: 200, priceUp: 600 };

  it('should update price filter when a price input changes', () => {
    const event = {
      target: { name: 'price', value: '400' },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      mockFilters,
      event,
      validPriceRange,
      camerasMock
    );

    expect(updatedFilters.price.price).toBe(400);
  });

  it('should update category filter when a category is selected', () => {
    const event = {
      target: { ariaLabel: FilterCameraCategory.Photocamera.id },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      mockFilters,
      event,
      validPriceRange,
      camerasMock
    );
    expect(updatedFilters.category).toBe(FilterCameraCategory.Photocamera.id);
  });

  it('should delete type Film and Snapshot when Videocamera category is selected', () => {
    const initialFilters: FiltersType = {
      price: { price: null, priceUp: null },
      category: null,
      type: [
        FilterCameraType.Film.id,
        FilterCameraType.Snapshot.id,
        FilterCameraType.Digital.id,
      ],
      level: [],
    };

    const event = {
      target: { ariaLabel: FilterCameraCategory.Videocamera.id },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      initialFilters,
      event,
      validPriceRange,
      camerasMock
    );

    expect(updatedFilters.category).toBe(FilterCameraCategory.Videocamera.id);
    expect(updatedFilters.type).not.toContain(FilterCameraType.Film.id);
    expect(updatedFilters.type).not.toContain(FilterCameraType.Snapshot.id);
    expect(updatedFilters.type).toContain(FilterCameraType.Digital.id);
  });

  it('should update type filter when a type checkbox is toggled', () => {
    const event = {
      target: { name: FilterCameraType.Digital.id, checked: true },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      mockFilters,
      event,
      validPriceRange,
      camerasMock
    );

    expect(updatedFilters.type).toContain(FilterCameraType.Digital.id);
  });

  it('should update level filter when a level checkbox is toggled', () => {
    const event = {
      target: { name: FilterCameraLevel.Professional.id, checked: true },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      mockFilters,
      event,
      validPriceRange,
      camerasMock
    );

    expect(updatedFilters.level).toContain(FilterCameraLevel.Professional.id);
  });

  it('should return unchanged filters for unknown inputs', () => {
    const event = {
      target: { name: 'unknownInput', value: 'testValue' },
    } as unknown as React.FormEvent<HTMLFormElement>;

    const updatedFilters = toUpdateFilters(
      mockFilters,
      event,
      validPriceRange,
      camerasMock
    );

    expect(updatedFilters).toEqual(mockFilters);
  });
});
