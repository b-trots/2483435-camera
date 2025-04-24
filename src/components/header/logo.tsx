import { Link } from 'react-router-dom';
import { BemClass, BemMode, LogoParam } from '@/const/const';
import { AppRoute } from '@/const/const-navigate';

type LogoProps = {
  bemBlock: string;
};

export function Logo({ bemBlock }: LogoProps) {
  const isFooter = bemBlock === BemClass.Footer ? BemMode.Mono : BemMode.Void;

  return (
    <Link
      className={`${bemBlock}__logo`}
      to={AppRoute.Main}
      aria-label={LogoParam.Name as string}
    >
      <svg width={LogoParam.Width} height={LogoParam.Height} aria-hidden="true">
        <use xlinkHref={`#icon-logo${isFooter}`} />
      </svg>
    </Link>
  );
}
