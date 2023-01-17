import { AccountLoader, PrivateRoute, ProtectedRoute } from '@wapl/core';
import React, { createContext, useContext, useEffect, useState } from 'react';
import RootStore from './RootStore';

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export const WaplShellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    window.addEventListener('message', ({ data: { type, token } }) => {
      if (type === 'token') setToken(token);
    });
  }, []);

  return (
    <AccountLoader {...(process.env.REACT_APP_MODE === 'production' && { token: token })}>
      {process.env.REACT_APP_MODE === 'local' ? (
        <PrivateRoute>{children}</PrivateRoute>
      ) : (
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </AccountLoader>
  );
};

export const useCalendarStores = () => useContext(RootStoreContext);
