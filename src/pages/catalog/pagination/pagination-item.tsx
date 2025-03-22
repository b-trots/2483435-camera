import { ButtonBemClass, PaginationButton } from '../../../const/const-button';
import {
  BemClass,
  BemMode,
  DefaultParam,
  ServiceParam,
} from '../../../const/const';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type PaginationItemProps = {
  pageName: string;
  currentPage: number;
  onClick: (page: number) => void;
};

export function PaginationItem({
  pageName,
  currentPage,
  onClick,
}: PaginationItemProps) {
  const isText = pageName === PaginationButton.Text;
  const isActive = Number(pageName) === currentPage;

  const buttonClass = classNames(
    BemClass.PaginationLink,
    isActive && `${BemClass.PaginationLink}${BemMode.Active}`,
    isText && ButtonBemClass.PaginationText
  );

  const newPage = Number(
    isText ? currentPage + Number(ServiceParam.PaginationStep) : pageName
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(newPage);
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
