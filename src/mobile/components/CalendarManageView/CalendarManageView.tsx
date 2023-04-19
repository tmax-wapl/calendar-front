import { useCalendarStores } from '@/stores/StoreProvider';
import FilterList from './FilterList';
import { CalendarManageViewContainer, Divider } from './CalendarManageView.style';
import EventBar from '../EventBar';

const CalendarManageView = () => {
  const { uiStore } = useCalendarStores();

  const handleBackClick = () => {
    uiStore.pageDialogInfo = null;
  };

  return (
    <>
      <EventBar title="캘린더 관리" leftSide={[{ action: 'close', onClick: handleBackClick }]} />
      <CalendarManageViewContainer>
        <FilterList />
        <Divider />
      </CalendarManageViewContainer>
    </>
  );
};

export default CalendarManageView;
