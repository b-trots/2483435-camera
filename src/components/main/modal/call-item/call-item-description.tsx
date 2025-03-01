import { ProductParam } from '../../../../const/const';
import { Level, ProductCategory } from '../../../../types/product-type';

type CallItemDescriptionProps = {
  name: string;
  vendorCode: string;
  category: ProductCategory;
  level: Level;
  price: number;
};

export function CallItemDescription({
  name,
  vendorCode,
  category,
  level,
  price,
}: CallItemDescriptionProps) {
  return (
    <div className="basket-item__description">
      <p className="basket-item__title">{name}</p>
      <ul className="basket-item__list">
        <li className="basket-item__list-item">
          <span className="basket-item__article">{ProductParam.Article}:</span>{' '}
          <span className="basket-item__number">{vendorCode}</span>
        </li>
        <li className="basket-item__list-item">{category}</li>
        <li className="basket-item__list-item">{level}</li>
      </ul>
      <p className="basket-item__price">
        <span className="visually-hidden">{ProductParam.Price}:</span>
        {`${price} ₽`}
      </p>
    </div>
  );
}
