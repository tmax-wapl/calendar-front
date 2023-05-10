import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import Item from './Item';
import { MyCalendarListContainer, FilterName } from './MyCalendarList.style';
import { observer } from 'mobx-react-lite';

const MyCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <MyCalendarListContainer>
      <FilterName>내 캘린더</FilterName>
      {calendarStore.calendarList
        ?.filter((calendar: CalendarModel) => calendar.type !== 'url' && calendar.type !== 'share')
        .map((calendar: CalendarModel) => (
          <Item key={calendar.id} calendar={calendar} />
        ))}
    </MyCalendarListContainer>
  );
});

export default MyCalendarList;
