import { BemClass, DefaultParam, ExplanationWord } from '@/const/const';
import { Promo } from './promo';
import { useAppSelector } from '@/hooks/hooks';
import {
  getTotalPrice,
  getTotalPriceWithDiscount,
} from '@/store/slices/order/order-selectors';
import { correctPrice } from '@/utils/utils';
import classNames from 'classnames';

export function Summary() {
  const totalPrice = useAppSelector(getTotalPrice);
  const { totalPriceWithDiscount, discount } = useAppSelector(
    getTotalPriceWithDiscount
  );

  const isDiscount = discount !== DefaultParam.ZeroValue;
  const discountClassName = classNames(
    BemClass.BasketSummary,
    isDiscount && BemClass.BasketSummaryBonus
  );

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
          <span className={discountClassName}>{correctPrice(discount)}</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            {ExplanationWord.ForPayment}
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {correctPrice(totalPriceWithDiscount)}
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          {ExplanationWord.PlaceAnOrder}
        </button>
      </div>
    </div>
  );
}
