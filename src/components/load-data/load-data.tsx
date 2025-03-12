import { CSSClass } from '../../const/const';
import css from './load-data.module.css';
export enum RequestCategory {
  Products = 'products',
  Product = 'product',
  Reviews = 'reviews',
}

export const LoadDataParam = {
  [RequestCategory.Products]: {
    loading: 'Загрузка товаров каталога',
    error:
      'Не удалось загрузить товары каталога. Попробуйте обновить страницу.',
  },
  [RequestCategory.Product]: {
    loading: 'Загрузка выбранного товара',
    error:
      'Не удалось загрузить выбранный товар. Попробуйте обновить страницу.',
  },
  [RequestCategory.Reviews]: {
    loading: 'Загрузка отзывов выбранного товара',
    error:
      'Не удалось загрузить отзывы выбранного товара. Попробуйте обновить страницу.',
  },
};

type LoadMessageType = {
  requestCategory: RequestCategory;
  loading: boolean;
  error: boolean;
};

export function LoadData({ requestCategory, loading, error }: LoadMessageType) {
  const request = LoadDataParam[requestCategory];

  if (error) {
    return <p className={css[CSSClass.ErrorMessage]}>{request.error}</p>;
  }

  if (loading) {
    return <p className={css[CSSClass.LoadMessage]}>{request.loading}</p>;
  }

  return null;
}
