import {
  CameraCategory,
  CameraLevel,
  CameraParam,
  CameraType,
} from '@/const/camera-const';
import { BemClass } from '@/const/const';
import { ProductPrice } from '@/pages/product/product-price';
import { correctCategory, correctLevel, correctName } from '@/utils/utils';

type BasketItemDescriptionProps = {
  name: string;
  vendorCode: string;
  category: CameraCategory;
  type: CameraType;
  level: CameraLevel;
  price?: number;
  isPrice?: boolean;
};

export function BasketItemDescription({
  name,
  vendorCode,
  category,
  type,
  level,
  price,
  isPrice,
}: BasketItemDescriptionProps) {
  return (
    <div className="basket-item__description">
      <p className="basket-item__title">{correctName(category, name)}</p>
      <ul className="basket-item__list">
        <li className="basket-item__list-item">
          <span className="basket-item__article">{CameraParam.Article}: </span>
          <span className="basket-item__number">{vendorCode}</span>
        </li>
        <li className="basket-item__list-item">
          {correctCategory(category, type)}
        </li>
        <li className="basket-item__list-item">{correctLevel(level)}</li>
      </ul>
      {isPrice && price && (
        <ProductPrice bemClass={BemClass.BasketItem} price={price} />
      )}
    </div>
  );
}
