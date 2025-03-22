import { useState } from 'react';
import { TabName } from '../../../const/const';
import { TabsControl } from './tabs-control';
import { TabsContent } from './tabs-content';

export function DetailTabs() {
  const [isActive, setIsActive] = useState(TabName.Description);

  const handleTabsButton = () => {
    setIsActive((prev) =>
      prev === TabName.Description
        ? TabName.Characteristics
        : TabName.Description
    );
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.values(TabName).map((item) => (
          <TabsControl
            key={item}
            item={item}
            isActive={isActive}
            onClick={handleTabsButton}
          />
        ))}
      </div>
      <TabsContent isActive={isActive} />
    </div>
  );
}
