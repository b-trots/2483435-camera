import { Breadcrumbs } from '@/components/main/breadcrumbs/breadcrumbs';
import { FullCamera } from '@/types/camera-type';
import { ProductDetail } from './product-detail';
import { AdditionalInfo } from './additional-info';
import { correctName } from '@/utils/utils';

type ProductContentProps = {
  camera: FullCamera | null;
};

export function ProductContent({ camera }: ProductContentProps) {
  if (!camera) {
    return null;
  }

  const cameraName = correctName(camera.category, camera.name);

  return (
    <>
      <Breadcrumbs cameraName={cameraName} />
      <ProductDetail camera={camera} />
      <AdditionalInfo />
    </>
  );
}
