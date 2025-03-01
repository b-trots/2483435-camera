import { useEffect, useRef, useState } from 'react';
import mockProducts from '../../../../mock/mock';
import { toast, ToastContainer } from 'react-toastify';
import {
  BemClass,
  CallItemParam,
  Error,
  Validation,
} from '../../../../const/const';
import { toLoopFocus } from '../modal-utils/to-loop-focus';
import { handleModalClose } from '../modal-utils/handle-modal-close';
import { notify } from '../../../../utils/error-utils';
import { toStandardizePhone } from '../../../../utils/utils';
import { ProductImg } from '../../../../pages/product/product-img';
import { CallItemDescription } from './call-item-description';
import { CallItemPhone } from './call-item-phone';
import { CloseButton } from '../../buttons/close-button';
import { ActiveButton } from '../../buttons/active-button';
import { ActiveButtonName, ButtonBemClass } from '../../../../const/const-button';
type CallItemProps = {
  productId: number;
  onClose: () => void;
};
export function CallItem({ productId, onClose }: CallItemProps) {
  const product = mockProducts.find((item) => item.id === productId)!;
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
  } = product;

  const [phone, setPhone] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstTabRef = useRef<HTMLInputElement | null>(null);
  const lastTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    toLoopFocus(containerRef, firstTabRef, lastTabRef);
    handleModalClose(containerRef, modalRef, lastTabRef, onClose);
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (Validation.PhoneInput.test(input)) {
      toast.dismiss();
      setPhone(input);
      setIsToastShown(false);
    } else {
      if (isToastShown) {
        return;
      }
      notify(Error.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), CallItemParam.ToastCloseTime);
    }
  };

  const handleSubmit = () => {
    if (!Validation.PhoneSubmit.test(phone)) {
      notify(Error.PhoneSubmit);
      return;
    }

    toStandardizePhone(phone);
    onClose();
  };

  return (
    <div className="modal is-active" ref={containerRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={modalRef}>
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
              firstTabRef={firstTabRef}
              phone={phone}
              handlePhoneChange={handlePhoneChange}
            />

            <ToastContainer
              autoClose={CallItemParam.ToastCloseTime}
              limit={CallItemParam.ToastLimitCount as number}
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
          <div className="modal__buttons">
            <ActiveButton
              onClick={handleSubmit}
              className={ButtonBemClass.Modal}
              isFitWidth
              text={ActiveButtonName.ToOrder}
              basketIcon
            />
          </div>
          <CloseButton lastTabRef={lastTabRef} />
        </div>
      </div>
    </div>
  );
}
