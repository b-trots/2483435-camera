import { ModalTitle, ServiceParam } from '@/const/const';
import { ActiveButton } from '../main/buttons/active-button';
import { ActiveButtonName, ButtonBemClass } from '@/const/const-button';
import { useAppDispatch } from '@/hooks/hooks';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { forwardRef } from 'react';

export function ReviewSuccessComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLButtonElement>
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleShoppingButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(closeModal());
    navigate(AppRoute.Main);
  };
  return (
    <>
      <p className="title title--h4">{ModalTitle.ReviewSuccess}</p>

      <svg
        className="modal__icon"
        width={ServiceParam.ReviewModalIconWidth}
        height={ServiceParam.ReviewModalIconHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-review-success" />
      </svg>

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

export const ReviewSuccess = forwardRef(ReviewSuccessComponent);
