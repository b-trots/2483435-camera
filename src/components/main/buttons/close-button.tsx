import { DefaultParam, NameSpace } from '../../../const/const';
import {
  ButtonBemClass,
  ButtonType,
  CloseButtonParam,
} from '../../../const/const-button';

type CloseButtonProps = {
  bemClass: ButtonBemClass.Cross | ButtonBemClass.FormSearchReset;
  type: ButtonType.Button | ButtonType.Reset;
  lastTabRef?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: () => void;
};

export function CloseButton({
  bemClass,
  type,
  lastTabRef,
  onClick,
}: CloseButtonProps) {
  const isSearch = bemClass === ButtonBemClass.FormSearchReset;
  const isAriaLabel = !isSearch
    ? { [NameSpace.AriaLabel]: CloseButtonParam.ClosePopap }
    : DefaultParam.EmptyObject;

  return (
    <button
      ref={lastTabRef || undefined}
      className={bemClass}
      type={type}
      {...isAriaLabel}
      onClick={onClick}
    >
      <svg
        width={CloseButtonParam.CloseButtonSize}
        height={CloseButtonParam.CloseButtonSize}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-close" />
      </svg>

      {isSearch && (
        <span className="visually-hidden">{CloseButtonParam.ResetSearch}</span>
      )}
    </button>
  );
}
