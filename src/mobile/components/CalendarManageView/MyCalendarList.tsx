import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { MyCalendarListContainer, FilterName, AddButton } from './MyCalendarList.style';
import { observer } from 'mobx-react-lite';

const MyCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <MyCalendarListContainer>
      <FilterName>
        내 캘린더
        {/* <AddButton>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton> */}
      </FilterName>
      {calendarStore.calendarList
        ?.filter((calendar: CalendarModel) => calendar.type === null)
        .map((calendar: CalendarModel) => (
          <Item key={calendar.id} calendar={calendar} />
        ))}
    </MyCalendarListContainer>
  );
});

export default MyCalendarList;
