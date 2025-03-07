import { ProductOfCatalog } from '../../../types/product-type';
import { BemClass, ModalWindow } from '../../../const/const';
import { ProductImg } from '../../../pages/product/product-img';
import { ProductPrice } from '../../../pages/product/product-price';
import { ProductRate } from '../../../pages/product/product-rate';
import { ActiveButton } from '../buttons/active-button';
import { PassiveButton } from '../buttons/passive-button';
import { ButtonBemClass, ActiveButtonName } from '../../../const/const-button';
import { memo } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { openModal } from '../../../store/slices/modal/modal-slice';
type ProductProps = {
  product: ProductOfCatalog;
  onClick: (id: number) => void;
};

function ProductCardComponent({ product, onClick }: ProductProps) {
  const dispatch = useAppDispatch();

  const handleBuyButton = () => {
    dispatch(openModal(ModalWindow.CallItem));
  };

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
  return (
    <div className="product-card">
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
        <p className="product-card__title">{name}</p>
        <ProductPrice bemClass={BemClass.ProductCard} price={price} />
      </div>
      <div className="product-card__buttons" onClick={() => onClick(id)}>
        <ActiveButton
          className={ButtonBemClass.ProductCard}
          text={ActiveButtonName.Buy}
          onClick={handleBuyButton}
        />
        <PassiveButton id={id} />
      </div>
    </div>
  );
}

export const ProductCard = memo(
  ProductCardComponent,
  (prevProps, nextProps) => prevProps.product === nextProps.product
);
