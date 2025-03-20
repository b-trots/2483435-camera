import { List } from '../../../components/main/list';
import { BemClass, CameraParam, TabName } from '../../../const/const';
import { useAppSelector } from '../../../hooks/hooks';
import { getCurrentCamera } from '../../../store/slices/cameras/cameras-selectors';
import { ProductDescription } from '../product-description';
import { TabsNamesValues } from './tabs-control';

type TabsContentProps = {
  isActive: TabsNamesValues;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const currentCamera = useAppSelector(getCurrentCamera);

  if (!currentCamera) {
    return;
  }

  const { vendorCode, category, type, level } = currentCamera;

  const characteristicDetails = [
    { title: CameraParam.Article, value: vendorCode },
    { title: CameraParam.Category, value: category },
    { title: CameraParam.Type, value: type },
    { title: CameraParam.Level, value: level },
  ];
  const isActiveDescription = isActive === TabName.Description;
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
