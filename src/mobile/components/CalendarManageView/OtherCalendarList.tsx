import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { OtherCalendarListContainer, FilterName, AddButton } from './OtherCalendarList.style';
// import RoomCalendarItem from './Item';

const OtherCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  const sortCalendarList = (): CalendarModel[] => {
    if (calendarStore.roomCalendarList && calendarStore.calendarList)
      return [...calendarStore.roomCalendarList, ...calendarStore.calendarList]
        .filter(
          (calendar: CalendarModel) => calendar.type === 'url' || calendar.type === 'share' || calendar.type === 'room',
        )
        ?.sort((a, b) => {
          return new Date(b.regDate).getTime() - new Date(a.regDate).getTime();
        });
    return [];
  };

  return (
    <OtherCalendarListContainer>
      <FilterName>
        다른 캘린더
        <AddButton>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton>
      </FilterName>
      {sortCalendarList().map((calendar: CalendarModel) =>
        calendar.type === 'room' ? (
          <></>
        ) : (
          // <RoomCalendarItem key={calendar.roomId} calendar={calendar} />
          <Item key={calendar.id} category={calendar} />
        ),
      )}
    </OtherCalendarListContainer>
  );
});

export default OtherCalendarList;
