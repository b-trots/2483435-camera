import {
  CameraCategory,
  CameraCategoryId,
  CameraLevel,
  CameraLevelId,
  CameraParam,
  CameraType,
  CameraTypeId,
} from './camera-const';

const FilterCameraPrice = {
  Price: { id: 'price', name: 'от' },
  PriceUp: { id: 'priceUp', name: 'до' },
} as const;

const FilterCameraCategory = {
  Photocamera: {
    id: CameraCategoryId.PhotoCamera,
    name: CameraCategory.PhotoCamera,
  },
  Videocamera: {
    id: CameraCategoryId.VideoCamera,
    name: CameraCategory.VideoCamera,
  },
} as const;

const FilterCameraType = {
  Digital: { id: CameraTypeId.Digital, name: CameraType.Digital },
  Film: { id: CameraTypeId.Film, name: CameraType.Film },
  Snapshot: { id: CameraTypeId.Snapshot, name: CameraType.Snapshot },
  Collection: { id: CameraTypeId.Collection, name: CameraType.Collection },
} as const;

const FilterCameraLevel = {
  Zero: { id: CameraLevelId.Zero, name: CameraLevel.Zero },
  'Non-professional': {
    id: CameraLevelId.NonProfessional,
    name: CameraLevel.NonProfessional,
  },
  Professional: {
    id: CameraLevelId.Professional,
    name: CameraLevel.Professional,
  },
} as const;

const FilterName = {
  Price: { id: 'price', name: CameraParam.Price },
  Category: { id: 'category', name: CameraParam.Category },
  Type: { id: 'type', name: CameraParam.Type },
  Level: { id: 'level', name: CameraParam.Level },
} as const;

const Filter = [
  {
    title: CameraParam.Price,
    params: Object.entries(FilterCameraPrice),
  },
  {
    title: CameraParam.Category,
    params: Object.entries(FilterCameraCategory),
  },
  {
    title: CameraParam.Type,
    params: Object.entries(FilterCameraType),
  },
  {
    title: CameraParam.Level,
    params: Object.entries(FilterCameraLevel),
  },
] as const;

const FilterAndSortParam = {
  Price: 'price',
  PriceUp: 'priceUp',
  Category: 'category',
  Type: 'type',
  Level: 'level',
  SortType: 'sortType',
  SortOrder: 'sortOrder',
} as const;

const FILTER_AND_SORT_PARAM = Object.values(FilterAndSortParam);

export {
  FilterCameraPrice,
  FilterCameraCategory,
  FilterCameraType,
  FilterCameraLevel,
  FilterName,
  Filter,
  FilterAndSortParam,
  FILTER_AND_SORT_PARAM,
};
