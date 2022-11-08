import React, { createContext, useContext } from 'react';
import RootStore from './RootStore';

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const useCalendarStores = () => useContext(RootStoreContext);
