import { Breadcrumbs } from '@/components/main/breadcrumbs/breadcrumbs';
import { FullCamera } from '@/types/camera-type';
import { ProductDetail } from './product-detail';
import { AdditionalInfo } from './additional-info';

type ProductContentProps = {
  camera: FullCamera | null;
};

export function ProductContent({ camera }: ProductContentProps) {
  if (!camera) {
    return null;
  }

  return (
    <>
      <Breadcrumbs cameraName={camera.name} />
      <ProductDetail camera={camera} />
      <AdditionalInfo />
    </>
  );
}
