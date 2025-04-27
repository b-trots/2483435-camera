import { CameraType, CameraCategory, CameraLevel } from '@/const/camera-const';
import { Cameras } from '@/types/camera-type';
import { filterCameras } from './search-utils';

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
    name: 'Photo1',
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

describe('filterCameras', () => {
  it('should return cameras that match the query (case insensitive)', () => {
    const query = 'camera';
    const result = filterCameras(query, camerasMock);

    expect(result).toEqual([camerasMock[0], camerasMock[1]]);
  });

  it('should return an empty array if no cameras match the query', () => {
    const query = 'Olympus';
    const result = filterCameras(query, camerasMock);

    expect(result).toEqual([]);
  });

  it('should return cameras that contain the query as part of their name', () => {
    const query = 'cam';
    const result = filterCameras(query, camerasMock);

    expect(result).toEqual([camerasMock[0], camerasMock[1]]);
  });

  it('should be case insensitive when matching the query', () => {
    const query = 'PHOTO';
    const result = filterCameras(query, camerasMock);

    expect(result).toEqual([camerasMock[2]]);
  });

  it('should return all cameras when query is an empty string', () => {
    const query = '';
    const result = filterCameras(query, camerasMock);

    expect(result).toEqual(camerasMock);
  });
});
