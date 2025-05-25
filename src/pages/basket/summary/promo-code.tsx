import {
  BemClass,
  BemMode,
  DefaultParam,
  ExplanationWord,
  NameSpace,
  Validation,
} from '@/const/const';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchCouponAction } from '@/store/slices/order/order-actions';
import {
  getCoupon,
  getCouponIsChecked,
} from '@/store/slices/order/order-selectors';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export function PromoCode() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentCoupon = useAppSelector(getCoupon);
  const couponIsChecked = useAppSelector(getCouponIsChecked);
  const isValidCoupon =
    currentCoupon !== null ? BemMode.IsValid : BemMode.IsInvalid;
  const promoFieldClassName = classNames(
    BemClass.CustomInput,
    couponIsChecked && isValidCoupon,
    currentCoupon && BemMode.IsValid
  );
  const couponValue = currentCoupon
    ? currentCoupon.name
    : DefaultParam.EmptyString;

  const [coupon, setCoupon] = useState(couponValue);

  useEffect(() => {
    setCoupon(currentCoupon ? currentCoupon.name : DefaultParam.EmptyString);
  }, [currentCoupon]);

  const handleUsePromoCodeButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const enteredCoupon = inputRef.current;
    if (enteredCoupon) {
      const adaptCouponValue = String(enteredCoupon.value).trim();
      dispatch(fetchCouponAction(adaptCouponValue));
    }
  };

  const handleCouponValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target;
    if (inputValue) {
      setCoupon(
        inputValue.value.replace(
          Validation.CouponInput,
          DefaultParam.EmptyString
        )
      );
    }
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">{ExplanationWord.IsTherePromoCode}</p>
      <div className="basket-form">
        <form action="#">
          <div className={promoFieldClassName}>
            <label>
              <span className="custom-input__label">{NameSpace.PromoCode}</span>
              <input
                type="text"
                name="promo"
                placeholder={ExplanationWord.EnterPromoCode}
                ref={inputRef}
                value={coupon}
                onChange={handleCouponValueChange}
              />
            </label>
            <p className="custom-input__error">
              {ExplanationWord.InvalidPromoCode}
            </p>
            <p className="custom-input__success">
              {ExplanationWord.ValidPromoCode}
            </p>
          </div>
          <button
            className="btn"
            type="submit"
            onClick={handleUsePromoCodeButtonClick}
          >
            {NameSpace.UseCode}
          </button>
        </form>
      </div>
    </div>
  );
}
