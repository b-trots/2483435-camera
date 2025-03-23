
enum CameraType {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

enum CameraCategory {
  VideoCamera = 'Видеокамера',
  PhotoCamera = 'Фотоаппарат',
}

enum Level {
  Null = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

interface FullCamera {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
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

type CameraForCatalog = Omit<FullCamera, 'description' | 'level' | 'type'>;

type Cameras = FullCamera[];

type CamerasForState = Record<number, FullCamera>;


export type {
  FullCamera,
  CameraForCatalog,
  Cameras,
  CamerasForState,
  PromoCamera,
};
export { CameraType, CameraCategory, Level };
