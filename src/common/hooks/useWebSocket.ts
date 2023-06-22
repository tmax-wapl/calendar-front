import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoreStore } from '@wapl/core';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';

interface JsonMessage {
  eventId: number;
  roomId?: number;
}

export const useWebSocket = (isMobile = false) => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const { userStore } = useCoreStore();
  const { userId } = useContext(CalendarContext);
  const navigate = useNavigate();

  const handleShareWs = (jsonMessage: JsonMessage) => {
    if (
      !calendarStore.calendarList.find(calendar => calendar.type === 'share') ||
      (jsonMessage?.roomId && !calendarStore.roomCalendarList.find(room => room.roomId === jsonMessage.roomId))
    )
      calendarStore.fetchCalendarList(userStore.selectedPersona.id, userId);
    uiStore.changeDateRange();
  };

  const handleCreateWs = () => {
    uiStore.changeDateRange();
  };

  const handleUpdateWs = async (jsonMessage: JsonMessage) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (uiStore.isDetail && +eventStore.event.id === jsonMessage?.eventId) {
      const { id, start, roomId } = eventStore.event;
      const eventInfo = await eventStore.getEventInfo(+id, start, roomId);
      eventStore.setEvent(eventInfo);
    }
  };

  const handleDeleteWs = (jsonMessage: JsonMessage) => {
    if (calendarStore.eventList.find(event => +event.id === jsonMessage?.eventId)) uiStore.changeDateRange();
    if (jsonMessage?.roomId) calendarStore.fetchCalendarList(userStore.selectedPersona.id, userId);
    if (uiStore.isDetail && +eventStore.event.id === jsonMessage?.eventId) {
      if (isMobile) uiStore.setPageDialogInfo(null);
      else navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    }
  };

  return {
    handleShareWs,
    handleCreateWs,
    handleUpdateWs,
    handleDeleteWs,
  };
};
