import { ProductOfCatalog } from '../../../types/product-type';
import { BemClass, BemMode, ModalWindow } from '../../../const/const';
import { ProductImg } from '../../../pages/product/product-img';
import { ProductPrice } from '../../../pages/product/product-price';
import { ProductRate } from '../../../pages/product/product-rate';
import { ActiveButton } from '../buttons/active-button';
import { PassiveButton } from '../buttons/passive-button';
import { ButtonBemClass, ActiveButtonName } from '../../../const/const-button';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { openModal } from '../../../store/slices/modal/modal-slice';
import {
  fetchOrSetProductAction,
  fetchOrSetReviewsAction,
  fetchSimilarAction,
} from '../../../store/api-actions/api-actions';
import { getCurrentProduct } from '../../../store/slices/products/products-selectors';

type ProductProps = {
  product: ProductOfCatalog;
  isActive?: boolean;
};

function ProductCardComponent({ product, isActive }: ProductProps) {
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getCurrentProduct);
  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
  } = product;

  const handleProductCardButtonsClick = () => {
    if (currentProduct?.id !== id) {
      dispatch(fetchOrSetProductAction(id));
    }
  };

  const handleBuyButtonClick = () => {
    dispatch(openModal(ModalWindow.CallItem));
  };

  const handleDetailButtonClick = () => {
    dispatch(fetchOrSetReviewsAction(id));
    dispatch(fetchSimilarAction(id));
  };

  const isActiveMode = isActive ? BemMode.IsActive : BemMode.Void;

  return (
    <div className={`product-card ${isActiveMode}`}>
      <ProductImg
        bemClass={BemClass.ProductCard}
        previewImgWebp={`/${previewImgWebp}`}
        previewImgWebp2x={`/${previewImgWebp2x}`}
        previewImg={`/${previewImg}`}
        previewImg2x={`/${previewImg2x}`}
        name={name}
      />
      <div className="product-card__info">
        <ProductRate
          bemClass={BemClass.ProductCard}
          rating={rating}
          reviewCount={reviewCount}
        />
        <p className="product-card__title">{name}</p>
        <ProductPrice bemClass={BemClass.ProductCard} price={price} />
      </div>
      <div
        className="product-card__buttons"
        onClick={handleProductCardButtonsClick}
      >
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
  ProductCardComponent,
  (prevProps, nextProps) => prevProps.product === nextProps.product
);
