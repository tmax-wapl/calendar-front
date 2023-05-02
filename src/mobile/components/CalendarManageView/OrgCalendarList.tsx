import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { OrgCalendarListContainer, FilterName } from './OrgCalendarList.style';

const OrgCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <>
      <OrgCalendarListContainer>
        <FilterName>조직 캘린더</FilterName>
        {calendarStore.roomCalendarList?.reduce((acc: JSX.Element[], cur: CalendarModel) => {
          if (cur.type === 'org') acc.push(<Item key={cur.id} calendar={cur} />);
          return acc;
        }, [])}
      </OrgCalendarListContainer>
    </>
  );
});

export default OrgCalendarList;
