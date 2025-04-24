import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  ErrorInfoMessage,
  ExplanationWord,
  ServiceParam,
  ToastParam,
  Validation,
} from '@/const/const';
import { toast, ToastContainer } from 'react-toastify';
import { phoneValidationError } from '@/utils/error-utils';

type CallItemPhoneProps = {
  onPhoneChange: (tel: string) => void;
};

export function CallItemPhoneComponent(
  { onPhoneChange }: CallItemPhoneProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [tel, setTel] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);

  const telRef = useRef(tel);

  useEffect(() => {
    telRef.current = tel;
  }, [tel]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (Validation.PhoneInput.test(input)) {
      toast.dismiss();
      setIsToastShown(false);
      setTel(input);
      onPhoneChange(input);
    } else if (!isToastShown) {
      phoneValidationError(ErrorInfoMessage.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), ToastParam.CloseTime);
    }
  };

  return (
    <label>
      <span className="custom-input__label">
        {ExplanationWord.Phone}
        <svg
          width={ServiceParam.SnowflakeSize}
          height={ServiceParam.SnowflakeSize}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-snowflake" />
        </svg>
      </span>
      <input
        ref={ref}
        type="tel"
        name="user-tel"
        value={tel}
        placeholder={ExplanationWord.EnterPhone}
        required
        onChange={handlePhoneChange}
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
    </label>
  );
}

export const CallItemPhone = forwardRef(CallItemPhoneComponent);
