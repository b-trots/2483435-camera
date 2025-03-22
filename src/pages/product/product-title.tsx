import { memo } from 'react';
import { FullCamera } from '../../types/product-type';

type ProductTitleProps = Pick<FullCamera, 'category' | 'name'>;

export function ProductTitleComponent({ category, name }: ProductTitleProps) {
  return (
    <p className="product-card__title">
      {category} {name}
    </p>
  );
}

export const ProductTitle = memo(ProductTitleComponent);
