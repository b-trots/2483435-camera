import classNames from 'classnames';
import { FullCamera } from '../../../types/camera-type';
import { BemClass } from '../../../const/const';

type SearchListItemProps = {
  camera: FullCamera;
  index: number;
  activeIndex: number | null;
  onClick: (id: number) => void;
  onHover: (index: number) => void;
  onLeave: () => void;
};

export function SearchListItem({
  camera,
  index,
  activeIndex,
  onClick,
  onHover,
  onLeave,
}: SearchListItemProps) {
  const itemClassName = classNames(
    BemClass.FormSearchSelectItem,
    index === activeIndex && BemClass.FormSearchSelectItemActive
  );

  return (
    <li
      id={`camera-${index}`}
      className={itemClassName}
      tabIndex={-1}
      onClick={() => onClick(camera.id)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {camera.name}
    </li>
  );
}
