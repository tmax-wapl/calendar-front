import React, { useEffect, useContext, useState } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarDTO } from '@/common/constants/interfaces';
import { CalendarModel } from '@/stores';
import LNB from './LNB';
import { Icon } from '@wapl/ui';

import { Outlet } from 'react-router-dom';

const CalendarLayout: React.FC = () => {
  const { userId } = useContext(CalendarContext);
  const { calendarStore } = useCalendarStores();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    const calendarList = await calendarStore.getCalendarList();
    calendarStore.setCalendarList(calendarList);
    const roomCalendarList = calendarStore.getLocalRoomCalendarList(userId);
    calendarStore.setRoomCalendarList(roomCalendarList?.map((room: Partial<CalendarDTO>) => new CalendarModel(room)));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <Icon.LoadingMotion />
      ) : (
        <>
          <LNB />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default CalendarLayout;
