import { TabsNames } from '../../../../const';

export type TabsNamesValues = typeof TabsNames[keyof typeof TabsNames];

type TabsControlProps = {
  item: TabsNamesValues;
  isActive: TabsNamesValues;
  onClick: () => void;
};

export function TabsControl({ item, isActive, onClick }: TabsControlProps) {
  const isActiveTab = isActive === item ? 'is-active' : '';
  return (
    <button
      className={`tabs__control ${isActiveTab}`}
      type="button"
      onClick={onClick}
    >
      {item}
    </button>
  );
}
