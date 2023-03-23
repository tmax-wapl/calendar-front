import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { CalendarDTO } from '@/common/constants/interfaces';
import RoomCalendarItem from './RoomCalendarItem';

const RoomCalendarList = observer(() => {
  const { userId } = useContext(CalendarContext);
  const { calendarStore } = useCalendarStores();

  const fetchData = async () => {
    const roomCalendarList = calendarStore.getLocalRoomCalendarList(userId);
    if (roomCalendarList)
      calendarStore.setRoomCalendarList(roomCalendarList.map((room: Partial<CalendarDTO>) => new CalendarModel(room)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {calendarStore.roomCalendarList?.map((calendar: CalendarModel) => (
        <RoomCalendarItem key={calendar.roomId} calendar={calendar} />
      ))}
    </>
  );
});

export default RoomCalendarList;
