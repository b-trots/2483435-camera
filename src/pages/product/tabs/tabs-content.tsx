import { List } from '../../../components/main/list';
import { BemClass, ProductParam, TabName } from '../../../const/const';
import { mockProducts } from '../../../mock/mock';
import { ProductDescription } from '../product-description';
import { TabsNamesValues } from './tabs-control';

type TabsContentProps = {
  isActive: TabsNamesValues;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const product = mockProducts[0];
  const { vendorCode, category, type, level } = product;

  const characteristicDetails = [
    { title: ProductParam.Article, value: vendorCode },
    { title: ProductParam.Category, value: category },
    { title: ProductParam.Type, value: type },
    { title: ProductParam.Level, value: level },
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
