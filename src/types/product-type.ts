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

interface FullProduct {
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

type PromoProduct = Pick<
  FullProduct,
  | 'id'
  | 'name'
  | 'previewImg'
  | 'previewImg2x'
  | 'previewImgWebp'
  | 'previewImgWebp2x'
>;

type ProductOfCatalog = Omit<
  FullProduct,
  'category' | 'description' | 'level' | 'type'
>;

type Products = FullProduct[];

type ProductsForStore = Record<number, FullProduct>;

export type { FullProduct, ProductOfCatalog, Products, ProductsForStore, PromoProduct };
export { ProductType, ProductCategory, Level };
