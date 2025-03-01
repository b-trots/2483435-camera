import { CloseButtonParam } from '../../../const/const-button';


type CloseButtonProps = {
  text?: string;
  lastTabRef?: React.MutableRefObject<HTMLButtonElement | null>;
};

export function CloseButton({
  text = CloseButtonParam.ClosePopap,
  lastTabRef,
}: CloseButtonProps) {
  return (
    <button
      ref={lastTabRef}
      className="cross-btn"
      type="button"
      aria-label={text}
    >
      <svg
        width={CloseButtonParam.CloseButtonSize}
        height={CloseButtonParam.CloseButtonSize}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-close" />
      </svg>
    </button>
  );
}
