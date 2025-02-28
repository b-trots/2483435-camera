import { Link } from 'react-router-dom';
import mockProducts from '../../mock/mock';
import { AppRoute } from '../../const/const-navigate';

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
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">{description}</span>
        <Link className="btn" to={AppRoute.Cameras.replace(':id', String(id))}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}
