import { ExplanationWord } from '@/const/const';
import { Promo } from './promo';
import { useAppSelector } from '@/hooks/hooks';
import { getTotalPrice } from '@/store/slices/order/order-selectors';
import { correctPrice } from '@/utils/utils';

export function Summary() {
  const totalPrice = useAppSelector(getTotalPrice);

  return (
    <div className="basket__summary">
      <Promo />
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">{ExplanationWord.Total}</span>
          <span className="basket__summary-value">
            {correctPrice(totalPrice)}
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">
            {ExplanationWord.Discount}
          </span>
          <span className="basket__summary-value basket__summary-value--bonus">
            0 ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            {ExplanationWord.ForPayment}
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            111 390 ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          {ExplanationWord.PlaceAnOrder}
        </button>
      </div>
    </div>
  );
}
