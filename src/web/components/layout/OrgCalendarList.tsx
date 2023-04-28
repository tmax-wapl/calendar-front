import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CategoryListContainer, Title } from './CategoryList.style';
import { observer } from 'mobx-react-lite';
import RoomCalendarItem from './RoomCalendarItem';

const OrgCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <CategoryListContainer>
      <Title>조직 캘린더</Title>
      {calendarStore.roomCalendarList?.reduce((acc: JSX.Element[], cur: CalendarModel) => {
        if (cur.type === 'org') acc.push(<RoomCalendarItem key={cur.id} calendar={cur} />);
        return acc;
      }, [])}
    </CategoryListContainer>
  );
});

export default OrgCalendarList;
