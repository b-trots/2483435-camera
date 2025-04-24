import { ButtonBemClass, PaginationButton } from '@/const/const-button';
import {
  BemClass,
  BemMode,
  DefaultParam
} from '@/const/const';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type PaginationItemProps = {
  pageName: string;
  currentPage: string;
  onClick: (page: string) => void;
};

export function PaginationItem({
  pageName,
  currentPage,
  onClick,
}: PaginationItemProps) {
  const isText =
    pageName === PaginationButton.Back || pageName === PaginationButton.Next;
  const isActive = pageName === currentPage;

  const buttonClass = classNames(
    BemClass.PaginationLink,
    isActive && `${BemClass.PaginationLink}${BemMode.Active}`,
    isText && ButtonBemClass.PaginationText
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(pageName);
  };

  return (
    <li className="pagination__item">
      <Link
        className={buttonClass}
        to={DefaultParam.EmptyString}
        onClick={handleClick}
      >
        {pageName}
      </Link>
    </li>
  );
}
