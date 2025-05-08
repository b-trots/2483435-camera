import { ServiceParam } from '@/const/const';

export function BasketIcon() {
  return (
    <svg
      width={ServiceParam.BasketIconSmallWidth}
      height={ServiceParam.BasketIconHeight}
      aria-hidden="true"
    >
      <use xlinkHref="#icon-basket" />
    </svg>
  );
}
