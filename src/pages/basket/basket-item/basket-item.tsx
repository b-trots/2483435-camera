import { BemClass, ExplanationWord, ModalType } from '@/const/const';
import { ProductImg } from '../../product/product-img';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getCameraById } from '@/store/slices/cameras/cameras-selectors';
import { ProductPrice } from '../../product/product-price';
import { Quantity } from './quantity/quantity';
import { BasketItemDescription } from './basket-item-description';
import { BasketCamera } from '@/types/types';
import { CloseButton } from '@/components/main/buttons/close-button';
import {
  ButtonBemClass,
  ButtonType,
  CloseButtonInfo,
} from '@/const/const-button';
import { handleModalOpen } from '@/store/slices/modal/modal-actions';
import { formatPrice } from '@/utils/utils';

type BasketItemProps = {
  camera: BasketCamera;
};

export function BasketItem({ camera }: BasketItemProps) {
  const dispatch = useAppDispatch();
  const { id, quantity } = camera;
  const currentCamera = useAppSelector(getCameraById(id));

  if (!currentCamera) {
    return null;
  }

  const {
    name,
    price,
    type,
    category,
    level,
    vendorCode,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = currentCamera;

  const handleDeleteButtonClick = () => {
    dispatch(handleModalOpen(ModalType.RemoveItem,id));
  };

  return (
    <li className="basket-item">
      <ProductImg
        bemClass={BemClass.BasketItem}
        previewImgWebp={`/${previewImgWebp}`}
        previewImgWebp2x={`/${previewImgWebp2x}`}
        previewImg={`/${previewImg}`}
        previewImg2x={`/${previewImg2x}`}
        name={name}
      />
      <BasketItemDescription
        name={name}
        vendorCode={vendorCode}
        category={category}
        level={level}
        type={type}
      />

      <ProductPrice bemClass={BemClass.BasketItem} price={price} />

      <Quantity camera={camera} />

      <div className="basket-item__total-price">
        <span className="visually-hidden">{ExplanationWord.TotalPrice}</span>
        {formatPrice(price * quantity)}
      </div>
      <CloseButton
        bemClass={ButtonBemClass.Cross}
        type={ButtonType.Button}
        info={CloseButtonInfo.DeleteProduct}
        onClick={handleDeleteButtonClick}
      />
    </li>
  );
}
