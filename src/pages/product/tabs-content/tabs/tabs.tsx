import { useState } from 'react';
import { TabsNames } from '../../../../const';
import { TabsControl } from './tabs-control';
import { TabsContent } from '../tabs-content';

export function Tabs() {
  const [isActive, setIsActive] = useState(TabsNames.Description);

  const handleTabsButton = () =>
    isActive === TabsNames.Description
      ? setIsActive(TabsNames.Characteristics)
      : setIsActive(TabsNames.Description);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.values(TabsNames).map((item) => (
          <TabsControl
            key={item}
            item={item}
            isActive={isActive}
            onClick={handleTabsButton}
          />
        ))}
      </div>
      <TabsContent isActive={isActive}/>
    </div>
  );
}
