import { Breadcrumbs } from '../../components/main/breadcrumbs/breadcrumbs';
import { FullCamera } from '../../types/product-type';
import { ProductDetail } from './product-detail';
import { AdditionalInfo } from './additional-info';

type ProductContentProps = {
  currentCamera: FullCamera | null;
};

export function ProductContent({ currentCamera }: ProductContentProps) {
  if (!currentCamera) {
    return null;
  }

  return (
    <>
      <Breadcrumbs productName={currentCamera.name} />
      <ProductDetail currentCamera={currentCamera} />
      <AdditionalInfo />
    </>
  );
}
