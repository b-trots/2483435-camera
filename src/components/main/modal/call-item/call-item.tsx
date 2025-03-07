import { useState, forwardRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Validation,
  ErrorMessage,
  CallItemParam,
  BemClass,
} from '../../../../const/const';
import {
  ButtonBemClass,
  ActiveButtonName,
} from '../../../../const/const-button';
import { useAppSelector } from '../../../../hooks/hooks';
import { ProductImg } from '../../../../pages/product/product-img';
import { notify } from '../../../../utils/error-utils';
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
      notify(ErrorMessage.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), CallItemParam.ToastCloseTime);
    }
  };

  const handleSubmit = () => {
    if (!Validation.PhoneSubmit.test(phone)) {
      notify(ErrorMessage.PhoneSubmit);
      return;
    }

    toStandardizePhone(phone);
    // onClose();
  };

  return (
    <>
      <p className="title title--h4">{CallItemParam.Title}</p>
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
          autoClose={CallItemParam.ToastCloseTime}
          limit={CallItemParam.ToastLimitCount}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme={CallItemParam.ToastTheme}
          transition={CallItemParam.ToastTransition}
          style={{
            position: CallItemParam.ToastPosition,
            top: CallItemParam.ToastTopDistance,
            left: CallItemParam.ToastLeftDistance,
            transform: CallItemParam.ToastTransform,
          }}
        />
      </div>
      <ActiveButton
        onClick={handleSubmit}
        className={ButtonBemClass.Modal}
        isFitWidth
        text={ActiveButtonName.ToOrder}
        basketIcon
      />
    </>
  );
}

export const CallItem = forwardRef(CallItemComponent);
