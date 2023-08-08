import { useEffect } from 'react';
import { StoreProvider } from './stores/StoreProvider';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import { useUserStore, usePersonaStore, useRoomStore } from '@wapl/core';
import Web from './web';
import Mobile from './mobile';
import { SettingInstance, isDevelop } from './common/lib';

interface Props {
  data: { eventId: number; start: string };
}

const App = ({ data }: Props) => {
  const isMobile = process.env.IS_MOBILE ?? false;
  const { selectedPersona } = useUserStore();
  const personaStore = usePersonaStore();
  const roomStore = useRoomStore();

  useEffect(() => {
    personaStore.getWsClient(selectedPersona.id).setClientQuery({
      personaId: selectedPersona.id as number,
      appId: 4,
    });
    personaStore.getWsClient(selectedPersona.id).connect();
    roomStore.fetchRoomList();
    return () => {
      personaStore.getWsClient(selectedPersona.id).disconnect();
    };
  }, [selectedPersona]);

  return (
    <CalendarProvider mode={MODE.FULL} userId={selectedPersona.id}>
      <StoreProvider>{isMobile ? <Mobile data={data} /> : <Web data={data} />}</StoreProvider>
    </CalendarProvider>
  );
};

export default App;
