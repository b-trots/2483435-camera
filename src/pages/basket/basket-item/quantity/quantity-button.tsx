import { BemMode, ExplanationWord, ServiceParam } from '@/const/const';
export type QuantityButtonType = BemMode.Prev | BemMode.Next;

type QuantityButtonProps = {
  bemMode: QuantityButtonType;
  onClick: (mode: QuantityButtonType) => void;
  disabled: boolean;
};

export function QuantityButton({
  bemMode,
  onClick,
  disabled,
}: QuantityButtonProps) {
  const info =
    bemMode === BemMode.Prev
      ? ExplanationWord.DecreaseQuantity
      : ExplanationWord.IncreaseQuantity;

  return (
    <button
      className={`btn-icon btn-icon${bemMode}`}
      aria-label={info}
      onClick={() => onClick(bemMode)}
      disabled={disabled}
    >
      <svg
        width={ServiceParam.QuantityButtonWidth}
        height={ServiceParam.QuantityButtonHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-arrow" />
      </svg>
    </button>
  );
}
