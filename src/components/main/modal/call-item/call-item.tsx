import { useState, forwardRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Validation,
  ErrorMessage,
  ToastParam,
  BemClass,
  ModalTitle,
} from '../../../../const/const';
import {
  ButtonBemClass,
  ActiveButtonName,
} from '../../../../const/const-button';
import { useAppSelector } from '../../../../hooks/hooks';
import { ProductImg } from '../../../../pages/product/product-img';
import { phoneValidationError } from '../../../../utils/error-utils';
import { toStandardizePhone } from '../../../../utils/utils';
import { ActiveButton } from '../../buttons/active-button';
import { CallItemDescription } from './call-item-description';
import { CallItemPhone } from './call-item-phone';
import { getCurrentProduct } from '../../../../store/slices/products/products-selectors';

function CallItemComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const currnetProduct = useAppSelector(getCurrentProduct);
  const [phone, setPhone] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  if (!currnetProduct) {
    return null;
  }

  const {
    name,
    vendorCode,
    level,
    category,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = currnetProduct;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (Validation.PhoneInput.test(input)) {
      toast.dismiss();
      setPhone(input);
      setIsToastShown(false);
    } else if (!isToastShown) {
      phoneValidationError(ErrorMessage.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), ToastParam.CloseTime);
    }
  };

  const handleSubmit = () => {
    if (!Validation.PhoneSubmit.test(phone)) {
      phoneValidationError(ErrorMessage.PhoneSubmit);
      return;
    }

    toStandardizePhone(phone);
    // onClose();
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
          phone={phone}
          handlePhoneChange={handlePhoneChange}
          ref={firstTabRef}
        />
        <ToastContainer
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
