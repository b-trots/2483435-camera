import { ButtonBemClass, PaginationButton } from '../../../const/const-button';
import { BemClass, BemMode } from '../../../const/const';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type PaginationItemProps = {
  pageName: string;
  currentPage: number;
};

export function PaginationItem({ pageName, currentPage }: PaginationItemProps) {
  const isText = pageName === PaginationButton.Text;
  const isActive = +pageName === currentPage;

  const buttonClass = classNames(
    BemClass.PaginationLink,
    isActive && BemClass.PaginationLink + BemMode.Active,
    isText && ButtonBemClass.PaginationText
  );

  const navigate = `?page=${isText ? currentPage + 1 : pageName}`;

  return (
    <li className="pagination__item">
      <Link className={buttonClass} to={navigate}>
        {pageName}
      </Link>
    </li>
  );
}
