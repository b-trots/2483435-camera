import { TabName } from '../../../const/const';
import { ProductCharacteristics } from '../product-characteristics';
import { ProductDescription } from '../product-description';
import { TabsNamesValues } from './tabs-control';


type TabsContentProps = {
  isActive: TabsNamesValues;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const isActiveDescription = isActive === TabName.Description;
  return (
    <div className="tabs__content">
      <div className="tabs__element is-active">
        {isActiveDescription ? <ProductDescription /> : <ProductCharacteristics />}
      </div>
    </div>
  );
}
