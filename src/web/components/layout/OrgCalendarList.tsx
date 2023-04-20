import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CategoryListContainer, Title } from './CategoryList.style';
import { observer } from 'mobx-react-lite';
import RoomCalendarItem from './RoomCalendarItem';

const OrgCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  const getFilteredCalendarList = () => {
    return calendarStore.calendarList.reduce((acc: CalendarModel[], cur: CalendarModel) => {
      const cal = calendarStore.roomCalendarList.find((cal: CalendarModel) => cal.id === cur.id);
      if (cur.type === 'org') acc.push(!!cal ? cal : cur);
      return acc;
    }, []);
  };

  return (
    <CategoryListContainer>
      <Title>조직 캘린더</Title>
      {getFilteredCalendarList().map((category: CalendarModel) => (
        <RoomCalendarItem key={category.id} calendar={category} />
      ))}
    </CategoryListContainer>
  );
});

export default OrgCalendarList;
