import { NameSpace } from '@/const/const';
import {
  ButtonBemClass,
  ButtonType,
  CloseButtonInfo,
  CloseButtonParam,
} from '@/const/const-button';

type CloseButtonProps = {
  bemClass: ButtonBemClass.Cross | ButtonBemClass.FormSearchReset;
  type: ButtonType.Button | ButtonType.Reset;
  lastTabRef?: React.MutableRefObject<HTMLButtonElement | null>;
  info?: CloseButtonInfo;
  onClick?: () => void;
};

export function CloseButton({
  bemClass,
  type,
  lastTabRef,
  info,
  onClick,
}: CloseButtonProps) {
  const isSearch = bemClass === ButtonBemClass.FormSearchReset;
  const isAriaLabel = !isSearch
    ? { [NameSpace.AriaLabel]: info }
    : {};

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
        <span className="visually-hidden">{CloseButtonInfo.ResetSearch}</span>
      )}
    </button>
  );
}
