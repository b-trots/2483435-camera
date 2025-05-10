import { Link } from 'react-router-dom';
import { ButtonBemClass, PassiveButtonName } from '@/const/const-button';
import { AppRoute } from '@/const/const-navigate';
import { forwardRef, memo } from 'react';
import classNames from 'classnames';

type PassiveButtonProps = {
  name: PassiveButtonName;
  id?: number;
  isModal?: boolean;
  isHalfWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

function PassiveButtonComponent(
  { name, id, isModal,isHalfWidth, onClick }: PassiveButtonProps,
  firstTabRef: React.Ref<HTMLAnchorElement>
) {
  const className = classNames(
    ButtonBemClass.Btn,
    ButtonBemClass.BtnTransparent,
    isModal && ButtonBemClass.Modal,
    isHalfWidth && ButtonBemClass.HalfWidth
  );

  const route = isModal
    ? AppRoute.Main
    : AppRoute.Cameras.replace(':id', String(id));

  return (
    <Link ref={firstTabRef} className={className} to={route} onClick={onClick}>
      {name}
    </Link>
  );
}

export const PassiveButton = memo(forwardRef(PassiveButtonComponent));
