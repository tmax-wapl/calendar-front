import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useUserStore } from '@wapl/core';
import { Icon, styled } from '@wapl/ui';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarDTO } from '@/common/constants/interfaces';
import { CalendarModel } from '@/stores';
import { Observer } from 'mobx-react-lite';
import PageRoutes from './PageRoutes';
import FAB from '../FAB';

const CalendarLayout = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const { selectedPersona } = useUserStore();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const fetchData = async () => {
    const calendarList = await calendarStore.getCalendarList();
    calendarStore.setCalendarList(calendarList.filter(({ type }) => type !== 'private' && type !== 'org'));

    const roomList = calendarList.filter(({ type }) => type === 'private' || type === 'org');
    const localRoomMap = new Map(
      calendarStore.getLocalRoomCalendarList(selectedPersona.id)?.map((room: CalendarDTO) => [room.roomId, room]),
    );

    const filteredRoomList = roomList.map((room: CalendarModel) =>
      localRoomMap.get(room.roomId) ? new CalendarModel(localRoomMap.get(room.roomId)) : room,
    );

    calendarStore.setRoomCalendarList(filteredRoomList);
    calendarStore.setInitialLocalRoomCalendarList(userId);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <Observer>{() => (uiStore.pageDialogInfo ? <PageRoutes /> : <FAB />)}</Observer>
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
