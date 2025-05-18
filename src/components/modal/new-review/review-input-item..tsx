import { Snowflake } from '@/components/main/snowflake';
import {
  BemClass,
  BemMode,
  NameSpace,
  REVIEW_PARAM,
  ReviewValidInfoMessage,
  ServiceParam,
} from '@/const/const';
import {
  NewReviewErrorType,
  NewReviewStringFieldsKeys,
  NewReviewType,
} from '@/types/types';
import classNames from 'classnames';
import { useState } from 'react';

type ReviewInputItemProps = {
  reviewParamItem: (typeof REVIEW_PARAM)[number];
  value: NewReviewType[keyof NewReviewType];
  errorStatus: NewReviewErrorType[keyof NewReviewErrorType];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export function ReviewInputItem({
  reviewParamItem,
  value,
  errorStatus,
  onChange,
}: ReviewInputItemProps) {
  const { title, id, info, error } = reviewParamItem;
  const isComment = id === NameSpace.CommentId;
  const isError = errorStatus === false;
  const [helpField, setHelpField] = useState<NewReviewStringFieldsKeys | null>(
    null
  );

  const correctClassName = classNames(
    isComment && BemClass.CustomTextArea,
    !isComment && BemClass.CustomInput,
    BemClass.FormReviewItem,
    isError && BemMode.IsInvalid
  );
  const fieldType = isComment ? BemClass.TextArea : BemClass.Input;

  const handleInputFocus = () => {
    setHelpField(id as NewReviewStringFieldsKeys);
  };
  const handleInputBlur = () => {
    setHelpField(null);
  };

  return (
    <div className={correctClassName}>
      <label>
        <span className={`custom-${fieldType}__label`}>
          {title}
          <Snowflake />
        </span>
        {!isComment ? (
          <input
            type="text"
            name={`user-${id}`}
            value={value}
            placeholder={info}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            autoComplete="off"
            onChange={onChange}
          />
        ) : (
          <textarea
            name="user-comment"
            minLength={ServiceParam.CommentMinLength}
            placeholder={info}
            value={value}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            autoComplete="off"
            onChange={onChange}
          />
        )}
        {helpField === id && (
          <div className="custom-input__hint">
            <span
              style={{
                margin: '100px',
                backgroundColor: 'white',
              }}
            >
              {ReviewValidInfoMessage[id]}
            </span>
          </div>
        )}
      </label>
      <p className={`custom-${fieldType}__error`}>{error}</p>
    </div>
  );
}
