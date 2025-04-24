import { Link } from 'react-router-dom';
import { PassiveButtonName } from '@/const/const-button';
import { AppRoute } from '@/const/const-navigate';
import { memo } from 'react';

type PassiveButtonProps = {
  id: number;
  onClick?: () => void;
};

function PassiveButtonComponent({ id, onClick }: PassiveButtonProps) {
  return (
    <Link
      className="btn btn--transparent"
      to={AppRoute.Cameras.replace(':id', String(id))}
      onClick={onClick}
    >
      {PassiveButtonName.Details}
    </Link>
  );
}

export const PassiveButton = memo(PassiveButtonComponent);
