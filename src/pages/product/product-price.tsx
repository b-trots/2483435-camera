import { BemClass, CameraParam } from '../../const/const';
import { formatPrice } from '../../utils/utils';

type ProductPriceProps = {
  bemClass: BemClass;
  price: number;
};

export function ProductPrice({ bemClass, price }: ProductPriceProps) {
  const correctPrice = formatPrice(price);

  return (
    <p className={`${bemClass}__price`}>
      <span className="visually-hidden">{CameraParam.Price}:</span>
      {correctPrice}
    </p>
  );
}
