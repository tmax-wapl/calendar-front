import { PrivateRoute, ProtectedRoute, UserLoader, ToppingProvider } from '@wapl/core';
import React, { createContext, useContext } from 'react';
import RootStore from './RootStore';

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const WaplShellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = {
    WAPLAUTH_URL: process.env.REACT_APP_WAPLAUTH_URL as string,
    WAPLAUTH_REALM: process.env.REACT_APP_WAPLAUTH_REALM as string,
    WAPLAUTH_CLIENT_ID: process.env.REACT_APP_WAPLAUTH_CLIENT_ID as string,
    COMMON_API_URL: process.env.REACT_APP_COMMON_API_URL,
    CALENDAR_API_URL: process.env.REACT_APP_CALENDAR_API_URL,
    ORG_API_URL: process.env.REACT_APP_ORG_API_URL,
    SOCKET_URL: process.env.REACT_APP_SOCKET_URL,
    AUTH_SOLUTION_URL: process.env.REACT_APP_AUTH_SOLUTION_URL,
  };

  return process.env.NODE_ENV === 'development' ? (
    <UserLoader config={config}>
      <PrivateRoute>{children}</PrivateRoute>
    </UserLoader>
  ) : (
    <ToppingProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </ToppingProvider>
  );
};

export const useCalendarStores = () => useContext(RootStoreContext);
