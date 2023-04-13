import React, { useEffect } from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { useUserStore, usePersonaStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';
import { SettingInstance, isDevelop } from './common';

const App: React.FC = () => {
  const isMobile = true;
  const { selectedPersona, keycloakInstance } = useUserStore();
  const personaStore = usePersonaStore();

  if (isDevelop) SettingInstance.setToken(keycloakInstance.token, selectedPersona.id);

  useEffect(() => {
    personaStore.getWsClient(selectedPersona.id).setClientQuery({
      personaId: selectedPersona.id as number,
      appId: 4,
    });
    personaStore.getWsClient(selectedPersona.id).connect();
    return () => {
      personaStore.getWsClient(selectedPersona.id).disconnect();
    };
  }, [selectedPersona]);

  return (
    <WaplUiProvider>
      <CalendarProvider mode={MODE.FULL} userId={selectedPersona.id}>
        <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
      </CalendarProvider>
    </WaplUiProvider>
  );
};

export default App;
