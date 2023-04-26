import { useCalendarStores } from '@/stores/StoreProvider';
import { useEffect } from 'react';
import FilterList from './FilterList';
import MyCalendarList from './MyCalendarList';
import OtherCalendarList from './OtherCalendarList';
import { CalendarManageViewContainer, Divider } from './CalendarManageView.style';
import EventBar from '../EventBar';

const CalendarManageView = () => {
  const { calendarStore, uiStore } = useCalendarStores();
  const fetchData = async () => {
    const calendarList = await calendarStore.getCalendarList();
    calendarStore.setCalendarList(calendarList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBackClick = () => {
    uiStore.pageDialogInfo = null;
  };

  return (
    <>
      <EventBar title="캘린더 관리" leftSide={[{ action: 'close', onClick: handleBackClick }]} />
      <CalendarManageViewContainer>
        <FilterList />
        <Divider />
        <MyCalendarList />
        <Divider />
        <OtherCalendarList />
      </CalendarManageViewContainer>
    </>
  );
};

export default CalendarManageView;
