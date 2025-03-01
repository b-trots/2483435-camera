import { Link } from 'react-router-dom';
import { PassiveButtonName } from '../../../const/const-button';
import { AppRoute } from '../../../const/const-navigate';

type PassiveButtonProps = {
  id: number;
};

export function PassiveButton({ id }: PassiveButtonProps) {
  return (
    <Link
      className="btn btn--transparent"
      to={AppRoute.Cameras.replace(':id', String(id))}
    >
      {PassiveButtonName.Details}
    </Link>
  );
}
