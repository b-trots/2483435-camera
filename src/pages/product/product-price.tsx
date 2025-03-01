import { BemClass, ProductParam } from '../../const/const';

type ProductPriceProps = {
  bemClass: BemClass;
  price: number;
};

export function ProductPrice({ bemClass, price }: ProductPriceProps) {
  return (
    <p className={`${bemClass}__price`}>
      <span className="visually-hidden">{ProductParam.Price}:</span>
      {`${price} ₽`}
    </p>
  );
}
