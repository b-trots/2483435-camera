import { BemMode, ServiceParam } from '../../../../const/const';
import { SliderButtonName } from '../../../../const/const-button';

export type SliderButtonBem = BemMode.Prev | BemMode.Next;

type SliderButtonProps = {
  bemMode: SliderButtonBem;
  text: SliderButtonName;
  onClick: () => void;
  disabled: boolean;
};

export function SliderButton({ bemMode, text, onClick, disabled }: SliderButtonProps) {
  return (
    <button
      className={`slider-controls slider-controls${bemMode}`}
      type="button"
      aria-label={text}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        width={ServiceParam.SliderArrowWidth}
        height={ServiceParam.SliderArrowHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-arrow" />
      </svg>
    </button>
  );
}
