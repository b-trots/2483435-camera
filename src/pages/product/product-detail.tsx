import { ActiveButton } from '@/components/main/buttons/active-button';
import { BemClass, ModalType } from '@/const/const';
import { ActiveButtonName } from '@/const/const-button';
import { FullCamera } from '@/types/camera-type';
import { DetailTabs } from './detail-tabs/detail-tabs';
import { ProductImg } from './product-img';
import { ProductPrice } from './product-price';
import { ProductRate } from './product-rate';
import { useAppDispatch } from '@/hooks/hooks';
import { useCallback } from 'react';
import { handleModalOpen } from '@/store/slices/modal/modal-actions';
import { correctName } from '@/utils/utils';

type ProductDetailProps = {
  camera: FullCamera;
};
export function ProductDetail({ camera }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = camera;

  const handleBuyButtonClick = useCallback(() => {
    dispatch(handleModalOpen(ModalType.AddItem, id));
  }, [dispatch, id]);

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
            <h1 className="title title--h3">
              {correctName(camera.category, camera.name)}
            </h1>
            <ProductRate
              bemClass={BemClass.Product}
              rating={rating}
              reviewCount={reviewCount}
            />
            <ProductPrice bemClass={BemClass.Product} price={price} />
            <ActiveButton
              text={ActiveButtonName.AddToBasket}
              basketIcon
              onClick={handleBuyButtonClick}
            />
            <DetailTabs />
          </div>
        </div>
      </section>
    </div>
  );
}
