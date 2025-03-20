import React from 'react';
import { ServiceParam } from '../../../const/const';
import { Link } from 'react-router-dom';

export function UpButton() {
  const handleUpButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link className="up-btn" to="#header" onClick={handleUpButtonClick}>
      <svg
        width={ServiceParam.UpButtonWidth}
        height={ServiceParam.UpButtonHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </Link>
  );
}
