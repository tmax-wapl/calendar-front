import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { AccountLoader, PrivateRoute, useAccountStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;
  const { selectedUser } = useAccountStore();
  // TODO: selectedUser 연동;
  return (
    <AccountLoader>
      <PrivateRoute>
        <WaplUiProvider>
          <CalendarProvider mode={MODE.FULL} userId={11}>
            <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
          </CalendarProvider>
        </WaplUiProvider>
      </PrivateRoute>
    </AccountLoader>
  );
};

export default App;
