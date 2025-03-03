import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const-navigate';
import { BannerParam } from '../../const/const';
import { PassiveButtonName } from '../../const/const-button';
import { mockProducts } from '../../mock/mock';

export function Banner() {
  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    id,
    name,
    description,
  } = mockProducts[0];
  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
        />
        <img
          src={previewImg}
          srcSet={previewImg2x}
          width={BannerParam.Width}
          height={BannerParam.Height}
          alt={BannerParam.Alt as string}
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">{BannerParam.Message}</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">{description}</span>
        <Link className="btn" to={AppRoute.Cameras.replace(':id', String(id))}>
          {PassiveButtonName.Details}
        </Link>
      </p>
    </div>
  );
}
