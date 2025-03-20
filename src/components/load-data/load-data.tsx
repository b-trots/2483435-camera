import { CSSClass, RequestCategory } from '../../const/const';
import css from './load-data.module.css';


export const LoadDataParam = {
  [RequestCategory.Cameras]: {
    loading: 'Загрузка товаров каталога',
    error:
      'Не удалось загрузить товары каталога. Попробуйте обновить страницу.',
  },
  [RequestCategory.Camera]: {
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
