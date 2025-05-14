import { memo } from 'react';
import { FullCamera } from '@/types/camera-type';
import { correctName } from '@/utils/utils';

type ProductTitleProps = Pick<FullCamera, 'category' | 'name'>;
export function ProductTitleComponent({ category, name }: ProductTitleProps) {
  return <p className="product-card__title">{correctName(category, name)}</p>;
}

export const ProductTitle = memo(ProductTitleComponent);
