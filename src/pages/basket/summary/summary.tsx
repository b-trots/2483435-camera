import { BemClass, DefaultParam, ExplanationWord } from '@/const/const';
import { PromoCode } from './promo-code';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  getBasket,
  getTotalPrice,
  getTotalPriceWithDiscountAndCoupon,
} from '@/store/slices/order/order-selectors';
import { formatPrice } from '@/utils/utils';
import classNames from 'classnames';
import { fetchOrderAction } from '@/store/slices/order/order-actions';

export function Summary() {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasket);
  const totalPrice = useAppSelector(getTotalPrice);
  const { totalPriceWithDiscountAndCoupon, discount } = useAppSelector(
    getTotalPriceWithDiscountAndCoupon
  );
  const isDiscount = Number(discount) !== DefaultParam.ZeroValue;
  const discountClassName = classNames(
    BemClass.BasketSummary,
    isDiscount && BemClass.BasketSummaryBonus
  );

  const handleOrderButtonClick = () => {
    dispatch(fetchOrderAction());
  };

  return (
    <div className="basket__summary">
      <PromoCode />
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">{ExplanationWord.Total}</span>
          <span className="basket__summary-value">
            {formatPrice(totalPrice)}
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">
            {ExplanationWord.Discount}
          </span>
          <span className={discountClassName}>{formatPrice(discount)}</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            {ExplanationWord.ForPayment}
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {formatPrice(totalPriceWithDiscountAndCoupon)}
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={handleOrderButtonClick}
          disabled={basket.length === DefaultParam.ZeroValue}
        >
          {ExplanationWord.PlaceAnOrder}
        </button>
      </div>
    </div>
  );
}
