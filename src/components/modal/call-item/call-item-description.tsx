import { CameraCategory, CameraLevel, CameraParam } from '@/const/camera-const';
import { formatPrice } from '@/utils/utils';

type CallItemDescriptionProps = {
  name: string;
  vendorCode: string;
  category: CameraCategory;
  level: CameraLevel;
  price: number;
};

export function CallItemDescription({
  name,
  vendorCode,
  category,
  level,
  price,
}: CallItemDescriptionProps) {
  const correctPrice = formatPrice(price);

  return (
    <div className="basket-item__description">
      <p className="basket-item__title">{name}</p>
      <ul className="basket-item__list">
        <li className="basket-item__list-item">
          <span className="basket-item__article">{CameraParam.Article}:</span>
          <span className="basket-item__number">{vendorCode}</span>
        </li>
        <li className="basket-item__list-item">{category}</li>
        <li className="basket-item__list-item">{level}</li>
      </ul>
      <p className="basket-item__price">
        <span className="visually-hidden">{CameraParam.Price}:</span>
        {correctPrice}
      </p>
    </div>
  );
}
