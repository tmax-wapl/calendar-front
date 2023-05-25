import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoreStore } from '@wapl/core';
import { Icon, styled } from '@wapl/ui';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useWebSocket } from '@common/hooks';
import { Observer } from 'mobx-react-lite';
import PageRoutes from './PageRoutes';
import FAB from '../FAB';

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
        <LoadingWrapper>
          <Icon.LoadingMotion />
        </LoadingWrapper>
      ) : (
        <ContentWrapper>
          <MainHeader title="캘린더" leftSide={headerLeftSide} rightSide={headerRightSide} />
          <CalendarHeader />
          <SplitLayout />
          <Observer>{() => !uiStore.pageDialogInfo && <FAB />}</Observer>
        </ContentWrapper>
      )}
    </>
  );
};

export default CalendarLayout;

const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  height: 100%;
`;
