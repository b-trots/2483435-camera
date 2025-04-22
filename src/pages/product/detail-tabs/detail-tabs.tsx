import { useState } from 'react';
import { SearchParam, TabName } from '../../../const/const';
import { TabsControl } from './tabs-control';
import { TabsContent } from './tabs-content';
import { useSearchParams } from 'react-router-dom';
import { TabNameId, TabNameKey } from '../../../types/types';

export function DetailTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabParam = searchParams.get(SearchParam.Info);

  const getValidTabId = (): TabNameId => {
    const tabIds = Object.values(TabName).map((tab) => tab.id);
    return currentTabParam && tabIds.includes(currentTabParam)
      ? currentTabParam
      : TabName.Description.id;
  };

  const [isActive, setIsActive] = useState<TabNameId>(getValidTabId());

  const handleTabsButton = (tabKey: TabNameKey) => {
    const newTabId = TabName[tabKey].id;
    setIsActive(newTabId);
    setSearchParams({ [SearchParam.Info]: newTabId }, { replace: true });
  };
  const isActiveKey = (key: TabNameKey) => isActive === TabName[key].id;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {Object.keys(TabName).map((key) => (
          <TabsControl
            key={key}
            tabNameKey={key as TabNameKey}
            isActive={isActiveKey(key as TabNameKey)}
            onClick={() => handleTabsButton(key as TabNameKey)}
          />
        ))}
      </div>
      <TabsContent isActive={isActive} />
    </div>
  );
}
