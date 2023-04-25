import React, { useEffect, useContext, useState } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarDTO } from '@/common/constants/interfaces';
import { CalendarModel } from '@/stores';
import LNB from './LNB';
import { Icon } from '@wapl/ui';
import { Outlet } from 'react-router-dom';
import { usePersonaStore, useUserStore, useRoomStore } from '@wapl/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { toUTC } from '@/utils';

interface JsonMessgae {
  eventId: number;
  roomId?: number;
}

const CalendarLayout: React.FC = () => {
  const { userId } = useContext(CalendarContext);
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const [isLoading, setLoading] = useState(true);
  const personaStore = usePersonaStore();
  const rootStore = useRoomStore();
  const { selectedPersona } = useUserStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    const calendarList = await calendarStore.getCalendarList();
    calendarStore.setCalendarList(calendarList);

    const roomCalendarList = calendarStore.getLocalRoomCalendarList(userId);
    if (roomCalendarList.length === 0) calendarStore.setInitialLocalRoomCalendarList(userId);
    else
      calendarStore.setRoomCalendarList(roomCalendarList?.map((room: Partial<CalendarDTO>) => new CalendarModel(room)));

    setLoading(false);
  };

  const handleShareWs = async (jsonMessage: JsonMessgae) => {
    if (!calendarStore.calendarList.find(calendar => calendar.type === 'share')) {
      const calendarList = await calendarStore.getCalendarList();
      calendarStore.setCalendarList(calendarList);
    }
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (jsonMessage?.roomId && !calendarStore.roomCalendarList.find(room => room.roomId === jsonMessage.roomId)) {
      const newRoom = rootStore.roomArray.find(room => room.id === jsonMessage.roomId);
      calendarStore.setLocalRoomCalendarList(userId, [
        {
          roomId: newRoom.id,
          name: newRoom.displayName,
          checkFlag: true,
          color: '#A143FF',
          regDate: toUTC(new Date()),
          type: 'room',
        },
        ...calendarStore.roomCalendarList.map(room => room.dto),
      ]);
    }
    uiStore.changeDateRange();
  };

  const handleUpdateWs = async (jsonMessage: JsonMessgae) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (pathname.includes('detail') && +eventStore.event.id === jsonMessage?.eventId) {
      const { id, start, roomId } = eventStore.event;
      const eventInfo = await eventStore.getEventInfo(+id, start, roomId);
      eventStore.setEvent(eventInfo);
    }
  };

  const handleDeleteWs = (jsonMessage: JsonMessgae) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if ((pathname.includes('detail') || pathname.includes('update')) && +eventStore.event.id === jsonMessage?.eventId)
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    personaStore.getWsClient(selectedPersona.id).addHandler('SHARE_EVENT', handleShareWs);
    personaStore.getWsClient(selectedPersona.id).addHandler('UPDATE_EVENT', handleUpdateWs);
    personaStore.getWsClient(selectedPersona.id).addHandler('DELETE_EVENT', handleDeleteWs);
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
