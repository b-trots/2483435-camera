import { TabsNames } from '../../../const';
import { Characteristics } from '../characteristics';
import { Description } from '../description';
import { TabsNamesValues } from './tabs/tabs-control';

type TabsContentProps = {
  isActive: TabsNamesValues;
};

export function TabsContent({ isActive }: TabsContentProps) {
  const isActiveDescription = isActive === TabsNames.Description;
  return (
    <div className="tabs__content">
      <div className="tabs__element is-active">
        {isActiveDescription ? <Description /> : <Characteristics />}
      </div>
    </div>
  );
}
