import { BemClass } from '@/const/const';
import { ProductImg } from '@/pages/product/product-img';
import { CallItemDescription } from './call-item-description';
import { FullCamera } from '@/types/camera-type';

type ProductDetailProps = {
  modalCamera: FullCamera;
};

export function ProductDetails({ modalCamera }: ProductDetailProps) {
  if (!modalCamera) {
    return null;
  }

  const {
    name,
    vendorCode,
    level,
    category,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
  } = modalCamera;

  return (
    <div className="basket-item basket-item--short">
      <ProductImg
        bemClass={BemClass.BasketItem}
        previewImgWebp={previewImgWebp}
        previewImgWebp2x={previewImgWebp2x}
        previewImg={previewImg}
        previewImg2x={previewImg2x}
        name={name}
      />
      <CallItemDescription
        name={name}
        vendorCode={vendorCode}
        category={category}
        level={level}
        price={price}
      />
    </div>
  );
}
