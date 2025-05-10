import { ModalTitle } from '@/const/const';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { forwardRef } from 'react';
import { AddCameraDetails } from './add-item/add-camera-details';
import { ActiveButton } from '../main/buttons/active-button';
import {
  ActiveButtonName,
  ButtonBemClass,
  PassiveButtonName,
} from '@/const/const-button';
import { PassiveButton } from '../main/buttons/passive-button';
import { getModalCamera } from '@/store/slices/modal/modal-selectors';
import { deleteCamera } from '@/store/slices/order/order-actions';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { AppRoute } from '@/const/const-navigate';
import { useLocation } from 'react-router-dom';

export function BasketRemoveItemComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLButtonElement>
) {
  const modalCamera = useAppSelector(getModalCamera);
  const dispatch = useAppDispatch();
  const path = useLocation().pathname;

  if (!modalCamera) {
    return null;
  }

  const handleDelete = () => {
    dispatch(deleteCamera(modalCamera.id));
    dispatch(closeModal());
  };

  const handleShoppingButtonClick = (e: React.MouseEvent) => {
    const isMain = path === AppRoute.Main;
    if (isMain) {
      e.preventDefault();
    }
    dispatch(closeModal());
  };

  return (
    <>
      <p className="title title--h4">{ModalTitle.RemoveItem}</p>

      <AddCameraDetails modalCamera={modalCamera} isModal />

      <div className="modal__buttons">
        <ActiveButton
          ref={firstTabRef}
          onClick={handleDelete}
          className={ButtonBemClass.Modal}
          isHalfWidth
          text={ActiveButtonName.Delete}
        />

        <PassiveButton
          name={PassiveButtonName.Shopping}
          isModal
          isHalfWidth
          onClick={handleShoppingButtonClick}
        />
      </div>
    </>
  );
}

export const BasketRemoveItem = forwardRef(BasketRemoveItemComponent);
