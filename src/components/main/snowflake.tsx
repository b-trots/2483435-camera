import { ServiceParam } from '@/const/const';

export function Snowflake() {
  return (
    <svg
      width={ServiceParam.SnowflakeSize}
      height={ServiceParam.SnowflakeSize}
      aria-hidden="true"
    >
      <use xlinkHref="#icon-snowflake" />
    </svg>
  );
}
