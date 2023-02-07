import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { useAccountStore, useUserStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;
  const { selectedUser } = useAccountStore();
  const { userList } = useUserStore();

  const userId = selectedUser ? selectedUser.id : userList[0]?.id;

  return (
    <WaplUiProvider>
      <CalendarProvider mode={MODE.FULL} userId={userId}>
        <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
      </CalendarProvider>
    </WaplUiProvider>
  );
};

export default App;
