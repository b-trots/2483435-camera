import classNames from 'classnames';
import { ServiceParam } from '../../../const/const';
import { ButtonBemClass, ActiveButtonName, ButtonType } from '../../../const/const-button';
import { memo } from 'react';

type ActiveButtonProps = {
  onClick?: () => void;
  className?: ButtonBemClass;
  isFitWidth?: boolean;
  isHalfWidth?: boolean;
  type?: ButtonType;
  text: ActiveButtonName;
  basketIcon?: boolean;
  disabled?: boolean;
};

function ActiveButtonComponent({
  onClick,
  className,
  isFitWidth = false,
  isHalfWidth = false,
  type,
  text,
  basketIcon,
  disabled,
}: ActiveButtonProps) {
  const buttonClass = classNames(
    'btn',
    'btn--purple',
    className,
    isFitWidth && ButtonBemClass.FitWidth,
    isHalfWidth && ButtonBemClass.HalfWidth
  );

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {basketIcon && (
        <svg
          width={ServiceParam.BasketIconWidth}
          height={ServiceParam.BasketIconHeight}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-add-basket" />
        </svg>
      )}
      {text}
    </button>
  );
}

export const ActiveButton = memo(
  ActiveButtonComponent,
  (prevProps, nextProps) =>
    prevProps.onClick === nextProps.onClick &&
    prevProps.className === nextProps.className &&
    prevProps.text === nextProps.text
);
