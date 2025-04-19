import classNames from 'classnames';
import {
  ButtonBemClass,
  ButtonName,
  ButtonType,
} from '../../../const/const-button';

type ButtonProps = {
  type: ButtonType;
  bemClass: ButtonBemClass;
  text: ButtonName;
  onClick?: () => void;
};

export function Button({ type, bemClass, text, onClick }: ButtonProps) {
  const buttonClassName = classNames(ButtonBemClass.Btn, bemClass);

  return (
    <button className={buttonClassName} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
