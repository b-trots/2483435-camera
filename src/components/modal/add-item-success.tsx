import { ModalTitle, ServiceParam } from '@/const/const';
import { ActiveButton } from '../main/buttons/active-button';
import {
  ActiveButtonName,
  ButtonBemClass,
  PassiveButtonName,
} from '@/const/const-button';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { PassiveButton } from '../main/buttons/passive-button';
import { useAppDispatch } from '@/hooks/hooks';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { forwardRef } from 'react';

export function AddItemSuccessComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLAnchorElement>
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleShoppingButtonClick = (e: React.MouseEvent) => {
    const isMain = path === AppRoute.Main;
    if (isMain) {
      e.preventDefault();
    }
    dispatch(closeModal());
  };

  const handleBasketButtonClick = () => {
    navigate(AppRoute.Card);
    dispatch(closeModal());
  };

  return (
    <>
      <p className="title title--h4">{ModalTitle.AddItemSuccess}</p>
      <svg
        className="modal__icon"
        width={ServiceParam.ModalIconWidth}
        height={ServiceParam.ModalIconHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <PassiveButton
          ref={firstTabRef}
          name={PassiveButtonName.Shopping}
          isModal
          onClick={handleShoppingButtonClick}
        />
        <ActiveButton
          onClick={handleBasketButtonClick}
          className={ButtonBemClass.Modal}
          isFitWidth
          text={ActiveButtonName.Basket}
        />
      </div>
    </>
  );
}

export const AddItemSuccess = forwardRef(AddItemSuccessComponent);
