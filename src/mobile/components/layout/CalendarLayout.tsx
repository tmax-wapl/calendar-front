import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoreStore } from '@wapl/core';
import { Icon } from '@wapl/ui';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useWebSocket } from '@common/hooks';

const CalendarLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(CalendarContext);
  const { calendarStore, uiStore } = useCalendarStores();
  const { personaStore, userStore } = useCoreStore();
  const navigate = useNavigate();
  const { handleShareWs, handleUpdateWs, handleDeleteWs } = useWebSocket(true);

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleSettingClick = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleHomeClick = () =>
    window.parent.postMessage(
      {
        type: 'shell:runTopping',
        appId: 'home',
      },
      '*',
    );

  const headerLeftSide: HeaderButton[] = [{ action: 'home', onClick: handleHomeClick }];

  const headerRightSide: HeaderButton[] = [
    { action: 'search', onClick: handleSearchClick },
    { action: 'setting', onClick: handleSettingClick },
  ];

  useEffect(() => {
    const fetchCalendarList = async () => {
      setIsLoading(true);
      await calendarStore.fetchCalendarList(userStore.selectedPersona.id, userId);
      setIsLoading(false);
    };
    fetchCalendarList();
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('SHARE_EVENT', handleShareWs);
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('UPDATE_EVENT', handleUpdateWs);
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('DELETE_EVENT', handleDeleteWs);
    return () => {
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('SHARE_EVENT');
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('UPDATE_EVENT');
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('DELETE_EVENT');
    };
  }, [userStore.selectedPersona.id]);

  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.LoadingMotion />
        </div>
      ) : (
        <div style={{ height: '100%' }}>
          <MainHeader title="캘린더" leftSide={headerLeftSide} rightSide={headerRightSide} />
          <CalendarHeader />
          <SplitLayout />
        </div>
      )}
    </>
  );
};

export default CalendarLayout;
