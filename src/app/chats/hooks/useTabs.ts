import { useState } from 'react';

export enum Tabs {
  USERS = 'users',
  CHATROOMS = 'chatrooms',
}

export const useTabs = (initial: Tabs = Tabs.CHATROOMS) => {
  const [activeTab, setActiveTab] = useState<Tabs>(initial);

  const handleTabClick = (tab: Tabs) => setActiveTab(tab);

  return { activeTab, handleTabClick, setActiveTab };
};
