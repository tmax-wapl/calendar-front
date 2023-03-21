import { API } from '@/common/lib/API';
import { PrivateRoute, ProtectedRoute, UserLoader } from '@wapl/core';
import React, { createContext, useContext, useEffect, useState } from 'react';
import RootStore from './RootStore';

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const WaplShellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(null);

  const config = {
    WAPLAUTH_URL: process.env.REACT_APP_WAPLAUTH_URL as string,
    WAPLAUTH_REALM: process.env.REACT_APP_WAPLAUTH_REALM as string,
    WAPLAUTH_CLIENT_ID: process.env.REACT_APP_WAPLAUTH_CLIENT_ID as string,
    COMMON_API_URL: process.env.REACT_APP_COMMON_API_URL,
    CALENDAR_API_URL: process.env.REACT_APP_CALENDAR_API_URL,
  };

  useEffect(() => {
    window.addEventListener('message', ({ data: { type, token } }) => {
      if (type === 'token') {
        setToken(token);
        API.setToken(token);
      }
    });
  }, []);

  return (
    <UserLoader config={config}>
      {process.env.REACT_APP_MODE === 'local' ? (
        <PrivateRoute>{children}</PrivateRoute>
      ) : (
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </UserLoader>
  );
};

export const useCalendarStores = () => useContext(RootStoreContext);
