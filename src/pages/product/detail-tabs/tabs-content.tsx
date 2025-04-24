import { List } from '@/components/main/list';
import { CameraParam } from '@/const/camera-const';
import { BemClass, TabName } from '@/const/const';
import { useAppSelector } from '@/hooks/hooks';
import { getCurrentCamera } from '@/store/slices/cameras/cameras-selectors';
import { TabNameId } from '@/types/types';
import { ProductDescription } from '../product-description';

type TabsContentProps = {
  isActive: TabNameId;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const currentCamera = useAppSelector(getCurrentCamera);

  if (!currentCamera) {
    return null;
  }

  const { vendorCode, category, type, level } = currentCamera;

  const characteristicDetails = [
    { title: CameraParam.Article, value: vendorCode },
    { title: CameraParam.Category, value: category },
    { title: CameraParam.Type, value: type },
    { title: CameraParam.Level, value: level },
  ];

  const isActiveDescription = isActive === TabName.Description.id;
  return (
    <div className="tabs__content">
      <div className="tabs__element is-active">
        {isActiveDescription ? (
          <ProductDescription />
        ) : (
          <List
            bemClass={BemClass.ProductTabs}
            listDetails={characteristicDetails}
          />
        )}
      </div>
    </div>
  );
}
