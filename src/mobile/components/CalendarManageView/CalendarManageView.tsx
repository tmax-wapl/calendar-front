import { useCalendarStores } from '@/stores/StoreProvider';
import FilterList from './FilterList';
import MyCalendarList from './MyCalendarList';
import OtherCalendarList from './OtherCalendarList';
import { CalendarManageViewContainer, ContentContainer, Divider } from './CalendarManageView.style';
import EventBar from '../header/EventBar';

const CalendarManageView = () => {
  const { uiStore } = useCalendarStores();

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
        <OtherCalendarList />
      </ContentContainer>
    </CalendarManageViewContainer>
  );
};

export default CalendarManageView;
