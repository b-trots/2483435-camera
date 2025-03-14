import { forwardRef } from 'react';
import { ExplanationWord, ServiceParam } from '../../../../const/const';

type CallItemPhoneProps = {
  phone: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CallItemPhoneComponent(
  { phone, handlePhoneChange }: CallItemPhoneProps,
  firstTabRef: React.Ref<HTMLInputElement>
) {
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
        ref={firstTabRef}
        type="tel"
        name="user-tel"
        value={phone}
        placeholder={ExplanationWord.EnterPhone}
        required
        onChange={handlePhoneChange}
      />
    </label>
  );
}

export const CallItemPhone = forwardRef(CallItemPhoneComponent);
