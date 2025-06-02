import React from 'react';
import { ServiceParam } from '@/const/const';
import { Link } from 'react-router-dom';

export function UpButton() {
  const handleUpButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: ServiceParam.WindowScrollYZero as number,
      behavior: 'smooth',
    });
  };

  return (
    <Link className="up-btn" to="#header" onClick={handleUpButtonClick}>
      <svg
        data-testid="up-button-svg"
        width={ServiceParam.UpButtonWidth}
        height={ServiceParam.UpButtonHeight}
        aria-hidden="true"
      >
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </Link>
  );
}
