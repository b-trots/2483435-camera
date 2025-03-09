import { List } from '../../../components/main/list';
import { BemClass, ProductParam, TabName } from '../../../const/const';
import { useAppSelector } from '../../../hooks/hooks';
import { getCurrentProduct } from '../../../store/slices/products/products-selectors';
import { ProductDescription } from '../product-description';
import { TabsNamesValues } from './tabs-control';

type TabsContentProps = {
  isActive: TabsNamesValues;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const currentProduct = useAppSelector(getCurrentProduct);

  if (!currentProduct) {
    return;
  }

  const { vendorCode, category, type, level } = currentProduct;

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
