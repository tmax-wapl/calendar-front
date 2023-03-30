import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { useUserStore, usePersonaStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';
import { SettingInstance, isDevelop } from './common';

const App: React.FC = () => {
  const isMobile = false;
  const { selectedPersona, keycloakInstance } = useUserStore();
  const { personaList } = usePersonaStore();

  const userId = selectedPersona ? selectedPersona.id : personaList[0]?.id;

  if (isDevelop) SettingInstance.setToken(keycloakInstance.token, userId);

  return (
    <WaplUiProvider>
      <CalendarProvider mode={MODE.FULL} userId={userId}>
        <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
      </CalendarProvider>
    </WaplUiProvider>
  );
};

export default App;
