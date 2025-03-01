import classNames from 'classnames';
import { DefaultParam, ServiceParam } from '../../../const/const';
import { ButtonBemClass, ActiveButtonName } from '../../../const/const-button';

type ActiveButtonProps = {
  onClick?: () => void;
  className?: ButtonBemClass;
  isFitWidth?: boolean;
  isHalfWidth?: boolean;
  type?: 'button' | 'submit';
  text: ActiveButtonName;
  basketIcon?: boolean;
};

export function ActiveButton({
  onClick,
  className,
  isFitWidth = false,
  isHalfWidth = false,
  type = DefaultParam.Button,
  text,
  basketIcon,
}: ActiveButtonProps) {
  const buttonClass = classNames(
    'btn',
    'btn--purple',
    className,
    isFitWidth && ButtonBemClass.FitWidth,
    isHalfWidth && ButtonBemClass.HalfWidth
  );

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {basketIcon && (
        <svg
          width={ServiceParam.BascetIconWidth}
          height={ServiceParam.BascetIconHeight}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-add-basket" />
        </svg>
      )}
      {text}
    </button>
  );
}
