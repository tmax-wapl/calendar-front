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
  const { selectedPersona } = useUserStore();
  const navigate = useNavigate();

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

  const handleShareWs = async (jsonMessage: JsonMessgae) => {
    if (!calendarStore.calendarList.find(calendar => calendar.type === 'share')) fetchData();
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) {
      uiStore.changeDateRange();
      return;
    }
    if (jsonMessage?.roomId && !calendarStore.roomCalendarList.find(room => room.roomId === jsonMessage.roomId))
      fetchData();
    uiStore.changeDateRange();
  };

  const handleUpdateWs = async (jsonMessage: JsonMessgae) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (uiStore.isDetail && +eventStore.event.id === jsonMessage?.eventId) {
      const { id, start, roomId } = eventStore.event;
      const eventInfo = await eventStore.getEventInfo(+id, start, roomId);
      eventStore.setEvent(eventInfo);
    }
  };

  const handleDeleteWs = (jsonMessage: JsonMessgae) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (jsonMessage?.roomId) fetchData();
    if (uiStore.isDetail && +eventStore.event.id === jsonMessage?.eventId)
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
