import { BemMode, ExplanationWord, ServiceParam } from '@/const/const';
import { QuantityButton, QuantityButtonType } from './quantity-button';
import { useAppDispatch } from '@/hooks/hooks';
import { changeCameraQuantity } from '@/store/slices/order/order-actions';
import { BasketCamera } from '@/types/types';

type QuantityProps = {
  camera: BasketCamera;
};

export function Quantity({ camera }: QuantityProps) {
  const { id, quantity } = camera;
  const dispatch = useAppDispatch();

  const handleQuantityButtonClick = (mode: QuantityButtonType) => {
    dispatch(changeCameraQuantity(id, mode));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCameraQuantity(id, Number(e.target.value)));
  };

  return (
    <div className="quantity">
      <QuantityButton
        bemMode={BemMode.Prev}
        onClick={handleQuantityButtonClick}
        disabled={quantity === ServiceParam.MinQuantity}
      />

      <label className="visually-hidden" htmlFor="counter1" />
      <input
        type="number"
        id="counter1"
        value={quantity}
        min={ServiceParam.MinQuantity}
        max={ServiceParam.MaxQuantity}
        aria-label={ExplanationWord.Quantity}
        onChange={handleQuantityChange}
      />
      <QuantityButton
        bemMode={BemMode.Next}
        onClick={handleQuantityButtonClick}
        disabled={quantity === ServiceParam.MaxQuantity}
      />
    </div>
  );
}
