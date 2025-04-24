import { forwardRef, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ToastParam,
  ExplanationWord,
  ModalTitle,
  DefaultParam,
  Validation,
  ErrorInfoMessage,
} from '@/const/const';
import { ButtonBemClass, ActiveButtonName } from '@/const/const-button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { getCoupon } from '@/store/slices/order/order-selectors';
import { toStandardizePhone } from '@/utils/utils';
import { ActiveButton } from '../../main/buttons/active-button';
import { CallItemPhone } from './call-item-phone';
import { fetchOrderAction } from '@/store/slices/order/order-actions';
import { ProductDetails } from './product-detail';
import { getModalCamera } from '@/store/slices/modal/modal-selectors';
import { phoneValidationError } from '@/utils/error-utils';
import { ToBlockActions } from '../../main/buttons/to-block-actions';

function CallItemComponent(
  _: unknown,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const modalCamera = useAppSelector(getModalCamera);
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);
  const telRef = useRef(DefaultParam.EmptyString);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (newTel: string) => {
    telRef.current = newTel;
  };

  const handleSubmit = () => {
    const currentTel = telRef.current;

    if (!Validation.PhoneSubmit.test(currentTel)) {
      phoneValidationError(ErrorInfoMessage.PhoneSubmit);
      return;
    }

    const correctTel = toStandardizePhone(currentTel);
    setIsSubmitting(true);

    dispatch(
      fetchOrderAction({
        camerasIds: [modalCamera?.id ?? DefaultParam.ZeroIndex],
        coupon,
        tel: correctTel,
      })
    )
      .unwrap()
      .then(() => {
        setIsSubmitting(false);
        dispatch(closeModal());
        toast.success(ExplanationWord.OrderSuccess, {
          containerId: ToastParam.Main,
        });
      });
  };

  if (!modalCamera) {
    return null;
  }

  return (
    <>
      {isSubmitting && <ToBlockActions/>}
      <p className="title title--h4">{ModalTitle.CallItem}</p>
      <ProductDetails modalCamera={modalCamera} />
      <div className="custom-input form-review__item">
        <CallItemPhone onPhoneChange={handlePhoneChange} ref={firstTabRef} />
      </div>
      <div className="modal__buttons">
        <ActiveButton
          onClick={handleSubmit}
          className={ButtonBemClass.Modal}
          isFitWidth
          text={ActiveButtonName.ToOrder}
          basketIcon
          disabled={isSubmitting}
        />
      </div>
    </>
  );
}

export const CallItem = forwardRef(CallItemComponent);
