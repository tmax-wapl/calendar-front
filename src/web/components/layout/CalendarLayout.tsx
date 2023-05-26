import React, { useEffect, useContext, useState } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import LNB from './LNB';
import { Icon } from '@wapl/ui';
import { Outlet } from 'react-router-dom';
import { usePersonaStore, useUserStore } from '@wapl/core';
import { useWebSocket } from '@common/hooks';

const CalendarLayout: React.FC = () => {
  const { userId } = useContext(CalendarContext);
  const { calendarStore } = useCalendarStores();
  const [isLoading, setIsLoading] = useState(true);
  const personaStore = usePersonaStore();
  const { selectedPersona } = useUserStore();
  const { handleShareWs, handleUpdateWs, handleDeleteWs } = useWebSocket();

  useEffect(() => {
    const fetchCalendarList = async () => {
      setIsLoading(true);
      await calendarStore.fetchCalendarList(selectedPersona.id, userId);
      setIsLoading(false);
    };
    fetchCalendarList();
    personaStore.getWsClient(selectedPersona.id).addHandler('SHARE_EVENT', handleShareWs);
    personaStore.getWsClient(selectedPersona.id).addHandler('UPDATE_EVENT', handleUpdateWs);
    personaStore.getWsClient(selectedPersona.id).addHandler('DELETE_EVENT', handleDeleteWs);
    calendarStore.setDefaultColor(selectedPersona.color);
    return () => {
      personaStore.getWsClient(selectedPersona.id).removeHandler('SHARE_EVENT');
      personaStore.getWsClient(selectedPersona.id).removeHandler('UPDATE_EVENT');
      personaStore.getWsClient(selectedPersona.id).removeHandler('DELETE_EVENT');
    };
  }, [selectedPersona]);

  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.LoadingMotion />
        </div>
      ) : (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <LNB />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default CalendarLayout;
