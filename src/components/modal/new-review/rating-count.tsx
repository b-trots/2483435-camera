import { Snowflake } from '@/components/main/snowflake';
import {
  BemClass,
  BemMode,
  ExplanationWord,
  Rating,
  RATING_STAR_COUNT,
  ServiceParam,
} from '@/const/const';
import { RatingStar } from './rating-star';
import { NewReviewErrorType } from '@/types/types';
import { forwardRef } from 'react';
import classNames from 'classnames';

type RatingCountProps = {
  value: number;
  errorStatus: NewReviewErrorType[keyof NewReviewErrorType];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RatingCountComponent(
  { value, errorStatus, onChange }: RatingCountProps,
  firstTabRef: React.Ref<HTMLInputElement>
) {
  const isError = errorStatus === false;
  const fieldClassName = classNames(
    BemClass.Rate,
    BemClass.FormReviewItem,
    isError && BemMode.IsInvalid
  );
  return (
    <fieldset className={fieldClassName}>
      <legend className="rate__caption">
        {ExplanationWord.Rating}
        <Snowflake />
      </legend>
      <div className="rate__bar">
        <div className="rate__group">
          {Object.entries(Rating).map((ratingItem) => (
            <RatingStar
              key={ratingItem[ServiceParam.FirstElement]}
              starName={ratingItem[ServiceParam.FirstElement]}
              value={ratingItem[ServiceParam.SecondElement]}
              onChange={onChange}
              ref={firstTabRef}
            />
          ))}
        </div>

        <div className="rate__progress">
          <span className="rate__stars">{value}</span>
          <span>{ExplanationWord.SlashSymbol}</span>
          <span className="rate__all-stars">{RATING_STAR_COUNT}</span>
        </div>
      </div>
      <p className="rate__message">{ExplanationWord.NeedToEvaluate}</p>
    </fieldset>
  );
}

export const RatingCount = forwardRef(RatingCountComponent);
