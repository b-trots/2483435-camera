import {
  BemClass,
  BemMode,
  CameraParam,
  ExplanationWord,
  RATING_STAR_COUNT,
  ServiceParam,
} from '../../const/const';

type ProductRateProps = {
  bemClass: BemClass;
  rating: number;
  reviewCount?: number;
};

export function ProductRate({
  bemClass,
  rating,
  reviewCount,
}: ProductRateProps) {
  const isReview = bemClass === BemClass.ReviewCard;

  const correctRating = Math.round(rating);
  const isFullStar = (starNumber: number, rartingCount: number) =>
    starNumber <= rartingCount ? BemMode.Full : BemMode.Void;

  return (
    <div className={`rate ${bemClass}__rate`}>
      {Array.from({ length: RATING_STAR_COUNT }).map((_, index) => (
        <svg
          width={ServiceParam.RateStarWidth}
          height={ServiceParam.RateStarHeight}
          aria-hidden="true"
          key={crypto.randomUUID()}
        >
          <use xlinkHref={`#icon${isFullStar(++index, correctRating)}-star`} />
        </svg>
      ))}

      <p className="visually-hidden">
        {isReview ? ExplanationWord.Grade : CameraParam.Rating} : {rating}
      </p>
      {!isReview && (
        <p className="rate__count">
          <span className="visually-hidden">{CameraParam.ReviewCount} :</span>
          {reviewCount}
        </p>
      )}
    </div>
  );
}
