import { useAppSelector } from '@/hooks/hooks';
import { BasketItem } from './basket-item/basket-item';
import { getBasket } from '@/store/slices/order/order-selectors';

export function BasketList() {
  const basket = useAppSelector(getBasket);

  return (
    <ul className="basket__list">
      {basket.map((camera) => (
        <BasketItem key={camera.id} camera={camera} />
      ))}
    </ul>
  );
}
