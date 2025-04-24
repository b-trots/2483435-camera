import { ActiveButton } from '@/components/main/buttons/active-button';
import { BemClass } from '@/const/const';
import { ActiveButtonName } from '@/const/const-button';
import { FullCamera } from '@/types/camera-type';
import { DetailTabs } from './detail-tabs/detail-tabs';
import { ProductImg } from './product-img';
import { ProductPrice } from './product-price';
import { ProductRate } from './product-rate';

type ProductDetailProps = {
  currentCamera: FullCamera;
};
export function ProductDetail({ currentCamera }: ProductDetailProps) {
  const {
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = currentCamera;

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <ProductImg
            bemClass={BemClass.Product}
            previewImgWebp={`/${previewImgWebp}`}
            previewImgWebp2x={`/${previewImgWebp2x}`}
            previewImg={`/${previewImg}`}
            previewImg2x={`/${previewImg2x}`}
            name={name}
          />
          <div className="product__content">
            <h1 className="title title--h3">{name}</h1>
            <ProductRate
              bemClass={BemClass.Product}
              rating={rating}
              reviewCount={reviewCount}
            />
            <ProductPrice bemClass={BemClass.Product} price={price} />
            <ActiveButton text={ActiveButtonName.AddToBasket} basketIcon />
            <DetailTabs />
          </div>
        </div>
      </section>
    </div>
  );
}
