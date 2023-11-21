import { FC, useState } from 'react';

import { ZERO_INDEX } from '@constants';
import { CustomButton, InfoTooltip } from '@components';

import style from './Tabs.module.scss';

interface TabsProps {
  tabsCount: Record<string, number | null>;
  tabsElements: Record<string, JSX.Element>;
}

export const Tabs: FC<TabsProps> = ({ tabsCount, tabsElements }) => {
  const tabsList = Object.entries(tabsCount);
  const [defaultActiveTab] = tabsList[ZERO_INDEX];

  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const onActiveTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const activeTabElement = tabsElements[activeTab];

  return (
    <section className={style.container}>
      <div className={style.tabs}>
        <ul className={style.tabs_list}>
          {tabsList.map(([tabName, tabCount]) => {
            const activeClass = tabName === activeTab ? style.active : '';

            return (
              <li
                className={`${style.tabs_item} ${activeClass}`}
                key={tabName}
              >
                <CustomButton onClick={() => onActiveTabChange(tabName)}>
                  <span className={style.tab_name}>{tabName}</span>
                  {!!tabCount && <InfoTooltip info={`${tabCount}`} />}
                </CustomButton>
              </li>
            );
          })}
        </ul>
      </div>

      {activeTabElement}
    </section>
  );
};
