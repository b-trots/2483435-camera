import { CameraForCatalog } from '../../../types/product-type';
import { BemClass, BemMode, ModalType } from '../../../const/const';
import { ProductImg } from '../../../pages/product/product-img';
import { ProductPrice } from '../../../pages/product/product-price';
import { ProductRate } from '../../../pages/product/product-rate';
import { ActiveButton } from '../buttons/active-button';
import { PassiveButton } from '../buttons/passive-button';
import { ButtonBemClass, ActiveButtonName } from '../../../const/const-button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';

import { fetchOrSetReviewsAction } from '../../../store/slices/reviews/reviews-actions';
import { fetchSimilarAction } from '../../../store/slices/cameras/cameras-actions';
import { handleModalOpen } from '../../../store/slices/modal/modal-actions';
import { ProductTitle } from '../../../pages/product/product-title';

type CameraProps = {
  camera: CameraForCatalog;
  isActive?: boolean;
};

function CameraCardComponent({ camera, isActive }: CameraProps) {
  const dispatch = useAppDispatch();
  const {
    id,
    name,
    category,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
  } = camera;

  const handleBuyButtonClick = useCallback(() => {
    dispatch(handleModalOpen(ModalType.CallItem, camera.id));
  }, [dispatch, camera.id]);

  const handleDetailButtonClick = useCallback(() => {
    dispatch(fetchOrSetReviewsAction(camera.id));
    dispatch(fetchSimilarAction(camera.id));
  }, [dispatch, camera.id]);

  const isActiveMode = isActive ? BemMode.IsActive : BemMode.Void;

  return (
    <div className={`product-card ${isActiveMode}`}>
      <ProductImg
        bemClass={BemClass.ProductCard}
        previewImgWebp={previewImgWebp}
        previewImgWebp2x={previewImgWebp2x}
        previewImg={previewImg}
        previewImg2x={previewImg2x}
        name={name}
      />
      <div className="product-card__info">
        <ProductRate
          bemClass={BemClass.ProductCard}
          rating={rating}
          reviewCount={reviewCount}
        />
        <ProductTitle category={category} name={name} />
        <ProductPrice bemClass={BemClass.ProductCard} price={price} />
      </div>
      <div className="product-card__buttons">
        <ActiveButton
          className={ButtonBemClass.ProductCard}
          text={ActiveButtonName.Buy}
          onClick={handleBuyButtonClick}
        />
        <PassiveButton id={id} onClick={handleDetailButtonClick} />
      </div>
    </div>
  );
}

export const ProductCard = memo(
  CameraCardComponent,
  (prevProps, nextProps) =>
    prevProps.camera.id === nextProps.camera.id &&
    prevProps.isActive === nextProps.isActive
);
