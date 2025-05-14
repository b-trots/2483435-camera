import PropTypes from 'prop-types';
import {
  CameraCategory,
  CameraLevel,
  CameraParam,
  CameraType,
} from '@/const/camera-const';

type AdaptedCameraCategory = CameraCategory | CameraParam.Photo;

interface FullCamera {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type PromoCamera = Pick<
  FullCamera,
  | 'id'
  | 'name'
  | 'previewImg'
  | 'previewImg2x'
  | 'previewImgWebp'
  | 'previewImgWebp2x'
>;

type CameraForCatalog = Omit<FullCamera, 'description' | 'level' | 'type'>;

type Cameras = FullCamera[];

const FullCameraPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  vendorCode: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(CameraType)).isRequired,
  category: PropTypes.oneOf(Object.values(CameraCategory)).isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.oneOf(Object.values(CameraLevel)).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  previewImg: PropTypes.string.isRequired,
  previewImg2x: PropTypes.string.isRequired,
  previewImgWebp: PropTypes.string.isRequired,
  previewImgWebp2x: PropTypes.string.isRequired,
});

const CamerasPropType = PropTypes.arrayOf(
  FullCameraPropType.isRequired
).isRequired;

export type {
  FullCamera,
  CameraForCatalog,
  Cameras,
  PromoCamera,
  AdaptedCameraCategory,
};

export { CamerasPropType };
