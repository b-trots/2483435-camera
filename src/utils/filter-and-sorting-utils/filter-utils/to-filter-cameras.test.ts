import { Cameras } from '@/types/camera-type';
import { toFilterCameras } from './to-filter-cameras';
import {
  FilterCameraCategory,
  FilterCameraLevel,
  FilterCameraType,
} from '@/const/filter-const';
import { FiltersType } from '@/types/filter-and-sort-types';
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

describe('toFilterCameras', () => {
  const mockFilters: FiltersType = {
    price: { price: null, priceUp: null },
    category: null,
    type: [],
    level: [],
  };

  it('should return all cameras when no filters are applied', () => {
    expect(toFilterCameras(mockFilters, camerasMock)).toEqual(camerasMock);
  });

  it('should filter cameras by price range', () => {
    const filters: FiltersType = {
      ...mockFilters,
      price: { price: 100, priceUp: 200 },
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([
      camerasMock[0],
      camerasMock[1],
    ]);
  });

  it('should filter cameras by category', () => {
    const filters: FiltersType = {
      ...mockFilters,
      category: FilterCameraCategory.Photocamera.id,
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([
      camerasMock[0],
      camerasMock[1],
    ]);
  });

  it('should filter cameras by type', () => {
    const filters: FiltersType = {
      ...mockFilters,
      type: [FilterCameraType.Digital.id],
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([camerasMock[1]]);
  });

  it('should filter cameras by level', () => {
    const filters: FiltersType = {
      ...mockFilters,
      level: [FilterCameraLevel['Non-professional'].id],
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([camerasMock[2]]);
  });

  it('should apply multiple filters', () => {
    const filters: FiltersType = {
      price: { price: 100, priceUp: 500 },
      category: FilterCameraCategory.Photocamera.id,
      type: [FilterCameraType.Digital.id],
      level: [FilterCameraLevel.Professional.id],
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([camerasMock[1]]);
  });

  it('should return an empty array if no cameras match the filters', () => {
    const filters: FiltersType = {
      ...mockFilters,
      price: { price: 600, priceUp: 1000 },
      category: FilterCameraCategory.Videocamera.id,
    };
    expect(toFilterCameras(filters, camerasMock)).toEqual([]);
  });
});
