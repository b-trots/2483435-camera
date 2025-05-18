import { forwardRef } from 'react';

type RatingStarProps = {
  starName: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RatingStarComponent(
  { starName, value, onChange }: RatingStarProps,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const id = `star-${value}`;
  return (
    <>
      <input
        className="visually-hidden"
        id={id}
        name="rate"
        type="radio"
        defaultValue={value}
        onChange={onChange}
        ref={firstTabRef}
      />
      <label className="rate__label" htmlFor={id} title={starName} />
    </>
  );
}

export const RatingStar = forwardRef(RatingStarComponent);
