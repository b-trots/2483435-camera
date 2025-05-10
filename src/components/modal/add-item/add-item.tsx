import { ModalTitle, ModalType } from '@/const/const';
import { ActiveButtonName, ButtonBemClass } from '@/const/const-button';
import { ActiveButton } from '@/components/main/buttons/active-button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getModalCamera } from '@/store/slices/modal/modal-selectors';
import { addCamera } from '@/store/slices/order/order-actions';
import { openModal } from '@/store/slices/modal/modal-slice';
import { forwardRef } from 'react';
import { AddCameraDetails } from '@/components/modal/add-item/add-camera-details';

export function AddItemComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLButtonElement>
) {
  const modalCamera = useAppSelector(getModalCamera);
  const dispatch = useAppDispatch();

  if (!modalCamera) {
    return null;
  }

  const handleSubmit = () => {
    dispatch(addCamera(modalCamera.id));
    dispatch(openModal(ModalType.AddItemSuccess));
  };

  return (
    <>
      <p className="title title--h4">{ModalTitle.AddItem}</p>

      <AddCameraDetails modalCamera={modalCamera} isModal isPrice/>

      <div className="modal__buttons">
        <ActiveButton
          ref={firstTabRef}
          onClick={handleSubmit}
          className={ButtonBemClass.Modal}
          isFitWidth
          text={ActiveButtonName.AddToBasket}
          basketIcon
        />
      </div>
    </>
  );
}

export const AddItem = forwardRef(AddItemComponent);
