import { Link } from 'react-router-dom';
import css from './style.module.css';
import { useChangeTitle } from '../../../hooks/use-change-title';
import { ExplanationWord, TitleName } from '../../../const/const';
import { AppRoute } from '../../../const/const-navigate';

export function Error(): JSX.Element {
  useChangeTitle(TitleName.PageNotFound);

  return (
    <div className={css.root}>
      <div className={css.smile}>☹</div>
      <div className={css.message}>404 Not Found</div>
      <Link className={css.home} to={AppRoute.Main}>
        {ExplanationWord.HomePage}
      </Link>
    </div>
  );
}
