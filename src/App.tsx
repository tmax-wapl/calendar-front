import React from 'react';
import { StoreProvider, WaplShellProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { useAccountStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;
  const { selectedUser } = useAccountStore();

  console.log(selectedUser);

  return (
    <WaplShellProvider>
      <WaplUiProvider>
        <CalendarProvider mode={MODE.FULL} userId={14}>
          <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
        </CalendarProvider>
      </WaplUiProvider>
    </WaplShellProvider>
  );
};

export default App;
