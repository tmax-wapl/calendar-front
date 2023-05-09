import { useCalendarStores } from '@/stores/StoreProvider';
import FilterList from './FilterList';
import MyCalendarList from './MyCalendarList';
import OrgCalendarList from './OrgCalendarList';
import OtherCalendarList from './OtherCalendarList';
import { CalendarManageViewContainer, ContentContainer, Divider } from './CalendarManageView.style';
import EventBar from '../header/EventBar';

const CalendarManageView = () => {
  const { uiStore, calendarStore } = useCalendarStores();

  const handleBackClick = () => {
    uiStore.setPageDialogInfo(null);
  };

  return (
    <CalendarManageViewContainer>
      <EventBar title="캘린더 관리" leftSide={[{ action: 'close', onClick: handleBackClick }]} />
      <ContentContainer>
        <FilterList />
        <Divider />
        <MyCalendarList />
        <Divider />
        {calendarStore.roomCalendarList.some(cal => cal.type === 'org') ? (
          <>
            <OrgCalendarList />
            <Divider />
          </>
        ) : null}
        <OtherCalendarList />
      </ContentContainer>
    </CalendarManageViewContainer>
  );
};

export default CalendarManageView;
