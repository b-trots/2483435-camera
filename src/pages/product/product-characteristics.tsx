import { ProductParam } from '../../const/const';
import mockProducts from '../../mock/mock';

export function ProductCharacteristics() {
  const product = mockProducts[0];
  const { vendorCode, category, type, level } = product;

  const characteristics = [
    { title: ProductParam.Article, value: vendorCode },
    { title: ProductParam.Category, value: category },
    { title: ProductParam.Type, value: type },
    { title: ProductParam.Level, value: level },
  ];

  return (
    <ul className="product__tabs-list">
      {characteristics.map(({ title, value }) => (
        <li className="item-list" key={title}>
          <span className="item-list__title">{title}:</span>
          <p className="item-list__text"> {value}</p>
        </li>
      ))}
    </ul>
  );
}
