import { Link } from 'react-router-dom';
// import { useChangeTitle } from '../../../hooks/title';
import css from './style.module.css';

export function Error(): JSX.Element {
  // useChangeTitle('Page Not Found');

  return (
    <div className={css.root}>
      <div className={css.smile}>☹</div>
      <div className={css.message}>404 Not Found</div>
      <Link className={css.home} to="/">
        Home Page
      </Link>
    </div>
  );
}
