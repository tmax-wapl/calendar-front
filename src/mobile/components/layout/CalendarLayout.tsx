import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useUserStore } from '@wapl/core';
import { Icon } from '@wapl/ui';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { CalendarDTO } from '@/common/constants/interfaces';
import { CalendarModel } from '@/stores';

const CalendarLayout = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const { selectedPersona } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleSettingClick = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleHomeClick = () => window.parent.postMessage({ type: 'shell:openDrawer' });

  const headerRightSide: HeaderButton[] = [
    { action: 'search', onClick: handleSearchClick },
    { action: 'setting', onClick: handleSettingClick },
    { action: 'home', onClick: handleHomeClick },
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
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.LoadingMotion />
        </div>
      ) : (
        <div style={{ height: '100%' }}>
          <MainHeader title="내 캘린더" rightSide={headerRightSide} />
          <CalendarHeader />
          <SplitLayout />
        </div>
      )}
    </>
  );
};

export default CalendarLayout;
