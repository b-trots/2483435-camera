import { memo } from 'react';
import { formatPrice } from '../../utils/utils';
import { CameraParam } from '../../const/camera-const';
import { BemClass } from '../../const/const';

type ProductPriceProps = {
  bemClass: BemClass;
  price: number;
};

function ProductPriceComponent({ bemClass, price }: ProductPriceProps) {
  const correctPrice = formatPrice(price);

  return (
    <p className={`${bemClass}__price`}>
      <span className="visually-hidden">{CameraParam.Price}:</span>
      {correctPrice}
    </p>
  );
}

export const ProductPrice = memo(
  ProductPriceComponent,
  (prevProps, nextProps) =>
    prevProps.bemClass === nextProps.bemClass &&
    prevProps.price === nextProps.price
);
