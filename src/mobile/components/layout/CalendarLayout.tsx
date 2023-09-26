import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoreStore } from '@wapl/core';
import { styled } from '@wapl/ui';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useWebSocket } from '@common/hooks';
import { Observer } from 'mobx-react-lite';
import FAB from '../FAB';
import { Loader } from '@/common/components/Loader';
import { MessageProps } from '@/WaplShellApp';

const CalendarLayout = ({ data }: MessageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(CalendarContext);
  const { calendarStore, uiStore } = useCalendarStores();
  const { personaStore, userStore } = useCoreStore();
  const navigate = useNavigate();
  const { handleShareWs, handleCreateWs, handleUpdateWs, handleDeleteWs } = useWebSocket(true);

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

  const handleRoute = () => {
    if (uiStore.pageDialogInfo || uiStore.dialogInfo) {
      uiStore[uiStore.pageDialogInfo ? 'setPageDialogInfo' : 'setDialogInfo'](null);
      return;
    }
    navigate(-1);
  };

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
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('CREATE_EVENT', handleCreateWs);
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('UPDATE_EVENT', handleUpdateWs);
    personaStore.getWsClient(userStore.selectedPersona.id).addHandler('DELETE_EVENT', handleDeleteWs);
    calendarStore.setDefaultColor(userStore.selectedPersona.color);
    return () => {
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('SHARE_EVENT');
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('CREATE_EVENT');
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('UPDATE_EVENT');
      personaStore.getWsClient(userStore.selectedPersona.id).removeHandler('DELETE_EVENT');
    };
  }, [userStore.selectedPersona.id]);

  useEffect(() => {
    if (!data) return;
    if (data === 'backEvent') handleRoute();
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
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

const ContentWrapper = styled.div`
  height: 100%;
`;
