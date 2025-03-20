import { useState, forwardRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Validation,
  ErrorInfoMessage,
  ToastParam,
  ExplanationWord,
  ModalTitle,
  BemClass,
} from '../../../const/const';
import { ButtonBemClass, ActiveButtonName } from '../../../const/const-button';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductImg } from '../../../pages/product/product-img';
import { closeModal } from '../../../store/slices/modal/modal-slice';
import { getCoupon } from '../../../store/slices/order/order-selectors';
import { phoneValidationError } from '../../../utils/error-utils';
import { toStandardizePhone } from '../../../utils/utils';
import { ActiveButton } from '../../main/buttons/active-button';
import { CallItemDescription } from './call-item-description';
import { CallItemPhone } from './call-item-phone';
import { FullCamera } from '../../../types/product-type';
import { fetchOrderAction } from '../../../store/slices/order/order-actions';

type CallItemProps = {
  modalCamera: FullCamera;
};

function CallItemComponent(
  { modalCamera }: CallItemProps,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const [tel, setTel] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  if (!modalCamera) {
    return null;
  }

  const {
    id,
    name,
    vendorCode,
    level,
    category,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = modalCamera;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (Validation.PhoneInput.test(input)) {
      toast.dismiss();
      setTel(input);
      setIsToastShown(false);
    } else if (!isToastShown) {
      phoneValidationError(ErrorInfoMessage.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), ToastParam.CloseTime);
    }
  };

  const handleSubmit = () => {
    if (!Validation.PhoneSubmit.test(tel)) {
      phoneValidationError(ErrorInfoMessage.PhoneSubmit);
      return;
    }

    const correctTel = toStandardizePhone(tel);

    dispatch(fetchOrderAction({ camerasIds: [id], coupon, tel: correctTel }))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        toast.success(ExplanationWord.OrderSuccess, {
          containerId: ToastParam.Main,
        });
      });
  };

  return (
    <>
      <p className="title title--h4">{ModalTitle.CallItem}</p>
      <div className="basket-item basket-item--short">
        <ProductImg
          bemClass={BemClass.BasketItem}
          previewImgWebp={previewImgWebp}
          previewImgWebp2x={previewImgWebp2x}
          previewImg={previewImg}
          previewImg2x={previewImg2x}
          name={name}
        />
        <CallItemDescription
          name={name}
          vendorCode={vendorCode}
          category={category}
          level={level}
          price={price}
        />
      </div>
      <div className="custom-input form-review__item">
        <CallItemPhone
          phone={tel}
          handlePhoneChange={handlePhoneChange}
          ref={firstTabRef}
        />
        <ToastContainer
          containerId={ToastParam.Modal}
          limit={ToastParam.LimitCount}
          style={{
            position: ToastParam.Position,
            top: ToastParam.TopDistance,
            left: ToastParam.LeftDistance,
            transform: ToastParam.Transform,
          }}
        />
      </div>
      <div className="modal__buttons">
        <ActiveButton
          onClick={handleSubmit}
          className={ButtonBemClass.Modal}
          isFitWidth
          text={ActiveButtonName.ToOrder}
          basketIcon
        />
      </div>
    </>
  );
}

export const CallItem = forwardRef(CallItemComponent);
