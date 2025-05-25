import { memo } from 'react';
import { FullCamera } from '@/types/camera-type';

type ProductTitleProps = Pick<FullCamera, 'category' | 'name'>;
export function ProductTitleComponent({ name }: ProductTitleProps) {
  return <p className="product-card__title">{name}</p>;
}

export const ProductTitle = memo(ProductTitleComponent);
