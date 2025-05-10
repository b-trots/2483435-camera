import { CameraForCatalog } from '@/types/camera-type';
import { BemClass, BemMode, ExplanationWord, ModalType } from '@/const/const';
import { ProductImg } from '@/pages/product/product-img';
import { ProductPrice } from '@/pages/product/product-price';
import { ProductRate } from '@/pages/product/product-rate';
import { ActiveButton } from '../buttons/active-button';
import { PassiveButton } from '../buttons/passive-button';
import {
  ButtonBemClass,
  ActiveButtonName,
  PassiveButtonName,
} from '@/const/const-button';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchOrSetReviewsAction } from '@/store/slices/reviews/reviews-actions';
import { fetchSimilarAction } from '@/store/slices/cameras/cameras-actions';
import { handleModalOpen } from '@/store/slices/modal/modal-actions';
import { ProductTitle } from '@/pages/product/product-title';
import { getBasket } from '@/store/slices/order/order-selectors';
import { Link } from 'react-router-dom';
import { BasketIcon } from '@/components/basket-icon';
import { AppRoute } from '@/const/const-navigate';

type CameraProps = {
  camera: CameraForCatalog;
  isActive?: boolean;
};

function CameraCardComponent({ camera, isActive }: CameraProps) {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(getBasket);
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
    dispatch(handleModalOpen(ModalType.AddItem, camera.id));
  }, [dispatch, camera.id]);

  const handleDetailButtonClick = useCallback(() => {
    dispatch(fetchOrSetReviewsAction(camera.id));
    dispatch(fetchSimilarAction(camera.id));
  }, [dispatch, camera.id]);

  const isActiveMode = isActive ? BemMode.IsActive : BemMode.Void;
  const isInBasket = basket.find((product) => product.id === id);

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
        {isInBasket ? (
          <Link
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
            to={AppRoute.Card}
          >
            <BasketIcon />
            {ExplanationWord.InBasket}
          </Link>
        ) : (
          <ActiveButton
            className={ButtonBemClass.ProductCard}
            text={ActiveButtonName.Buy}
            onClick={handleBuyButtonClick}
          />
        )}
        <PassiveButton
          name={PassiveButtonName.Details}
          id={id}
          onClick={handleDetailButtonClick}
        />
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
