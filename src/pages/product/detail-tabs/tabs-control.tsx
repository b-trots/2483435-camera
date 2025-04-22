import { BemMode, TabName } from '../../../const/const';
import { TabNameKey } from '../../../types/types';

type TabsControlProps = {
  tabNameKey: TabNameKey;
  isActive: boolean;
  onClick: () => void;
};

export function TabsControl({
  tabNameKey,
  isActive,
  onClick,
}: TabsControlProps) {
  const tabName = TabName[tabNameKey].value;
  const isActiveTab = isActive ? BemMode.IsActive : BemMode.Void;
  return (
    <button
      className={`tabs__control ${isActiveTab}`}
      type="button"
      onClick={onClick}
    >
      {tabName}
    </button>
  );
}
