import { BemClass } from '@/const/const';
import { ProductImg } from '@/pages/product/product-img';
import { FullCamera } from '@/types/camera-type';
import { BasketItemDescription } from '../../../pages/basket/basket-item/basket-item-description';
import classNames from 'classnames';

type AddCameraDetailsProps = {
  modalCamera: FullCamera;
  isModal?: boolean;
  isPrice?:boolean;
};

export function AddCameraDetails({
  modalCamera,
  isModal,
  isPrice
}: AddCameraDetailsProps) {
  const detailsClassName = classNames(
    BemClass.BasketItem,
    isModal && BemClass.BasketItemShort
  );

  if (!modalCamera) {
    return null;
  }

  const {
    name,
    vendorCode,
    level,
    category,
    type,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = modalCamera;

  return (
    <div className={detailsClassName}>
      <ProductImg
        bemClass={BemClass.BasketItem}
        previewImgWebp={previewImgWebp}
        previewImgWebp2x={previewImgWebp2x}
        previewImg={previewImg}
        previewImg2x={previewImg2x}
        name={name}
      />
      <BasketItemDescription
        name={name}
        vendorCode={vendorCode}
        category={category}
        type={type}
        level={level}
        price={price}
        isPrice={isPrice}
      />
    </div>
  );
}
