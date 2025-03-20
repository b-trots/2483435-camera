import { ReviewType } from './types';

enum ProductType {
  Коллекционная = 'Коллекционная',
  Моментальная = 'Моментальная',
  Цифровая = 'Цифровая',
  Плёночная = 'Плёночная',
}

enum ProductCategory {
  Видеокамера = 'Видеокамера',
  Фотоаппарат = 'Фотоаппарат',
}

enum Level {
  Нулевой = 'Нулевой',
  Любительский = 'Любительский',
  Профессиональный = 'Профессиональный',
}

interface FullCamera {
  id: number;
  name: string;
  vendorCode: string;
  type: ProductType;
  category: ProductCategory;
  description: string;
  level: Level;
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

type ProductOfCatalog = Omit<FullCamera, 'description' | 'level' | 'type'>;

type Cameras = FullCamera[];

type CamerasForStore = Record<number, FullCamera>;
type ReviewsForStore = Record<number, ReviewType>;

export type {
  FullCamera,
  ProductOfCatalog,
  Cameras,
  CamerasForStore,
  ReviewsForStore,
  PromoCamera,
};
export { ProductType, ProductCategory, Level };
