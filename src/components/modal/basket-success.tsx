import { DefaultParam, ModalTitle, ServiceParam } from '@/const/const';
import { ActiveButton } from '../main/buttons/active-button';
import { ActiveButtonName, ButtonBemClass } from '@/const/const-button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { getOrderError } from '@/store/slices/order/order-selectors';

export function BasketSuccessComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLButtonElement>
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderError = useAppSelector(getOrderError);
  const isOrderError = orderError.length !== DefaultParam.ZeroValue;
  const title = isOrderError ? ModalTitle.Error : ModalTitle.BasketSuccess;
  const handleShoppingButtonClick = () => {
    navigate(AppRoute.Main);
    dispatch(closeModal());
  };

  return (
    <>
      <p className="title title--h4">{title}</p>
      {isOrderError ? (
        <span
          style={{
            margin:'30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {orderError}
        </span>
      ) : (
        <svg
          className="modal__icon"
          width={ServiceParam.ReviewModalIconWidth}
          height={ServiceParam.ReviewModalIconHeight}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-review-success" />
        </svg>
      )}

      <div className="modal__buttons">
        <ActiveButton
          ref={firstTabRef}
          onClick={handleShoppingButtonClick}
          className={ButtonBemClass.Modal}
          isFitWidth
          text={ActiveButtonName.BackShopping}
        />
      </div>
    </>
  );
}

export const BasketSuccess = forwardRef(BasketSuccessComponent);
