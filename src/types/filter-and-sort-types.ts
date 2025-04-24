import {
  Filter,
  FilterCameraCategory,
  FilterCameraLevel,
  FilterCameraPrice,
  FilterCameraType,
  FilterName,
} from '@/const/filter-const';
import { SortOrder, SortParam, SortType } from '@/const/sorting-const';

type FilterPriceKeys =
  (typeof FilterCameraPrice)[keyof typeof FilterCameraPrice]['id'];

type FilterCameraPriceType = {
  [FilterCameraPrice.Price.id]: number | null;
  [FilterCameraPrice.PriceUp.id]: number | null;
};

type FilterCameraCategoryType =
  (typeof FilterCameraCategory)[keyof typeof FilterCameraCategory]['id'];

type FilterCameraTypeType =
  (typeof FilterCameraType)[keyof typeof FilterCameraType]['id'];

type FilterCameraLevelType =
  (typeof FilterCameraLevel)[keyof typeof FilterCameraLevel]['id'];

type FiltersValues =
  | FilterPriceKeys
  | FilterCameraCategoryType
  | FilterCameraTypeType
  | FilterCameraLevelType;

type FiltersType = {
  [FilterName.Price.id]: FilterCameraPriceType;
  [FilterName.Category.id]: FilterCameraCategoryType | null;
  [FilterName.Type.id]: FilterCameraTypeType[];
  [FilterName.Level.id]: FilterCameraLevelType[];
};

type FilterItemType = (typeof Filter)[number];

type FilterNameRus = typeof FilterName[keyof typeof FilterName]['name'];

type SortingType = {
  [SortParam.Type]: SortType;
  [SortParam.Order]: SortOrder;
};

type SortingValue = SortType | SortOrder;

export type {
  FilterPriceKeys,
  FilterCameraPriceType,
  FilterCameraCategoryType,
  FilterCameraTypeType,
  FilterCameraLevelType,
  FiltersType,
  SortingType,
  SortingValue,
  FiltersValues,
  FilterItemType,
  FilterNameRus
};
