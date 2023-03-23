import { memo, useEffect, useContext } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Icon } from '@wapl/ui';
import { LNBContainer, LNBHeader, DatePickerWrapper, FilterListWrapper, ScrollListWrapper, Divider } from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';
import FilterList from './FilterList';
import CategoryList from './CategoryList';
import SubscriptionList from './SubscriptionList';
import RoomCalendarList from './RoomCalendarList';
import { Observer } from 'mobx-react-lite';

const LNB = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();

  const fetchData = async (userId: number) => {
    const calendarList = await calendarStore.getCalendarList(userId);
    calendarStore.setCalendarList(calendarList);
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  return (
    <LNBContainer id="lnb">
      <LNBHeader>
        <Icon.CalendarColor className="mr-8" width={32} height={32} />
        캘린더
      </LNBHeader>
      <DatePickerWrapper>
        <Observer>
          {() => {
            return (
              <DatePicker
                date={uiStore.dateRange.view}
                onDateClick={selectedDate => {
                  uiStore.handleDateClick(selectedDate);
                  uiStore.setDateDay(selectedDate);
                }}
                backgroundColor="#F8F9FA"
              />
            );
          }}
        </Observer>
      </DatePickerWrapper>
      <FilterListWrapper>
        <FilterList />
        <Divider />
      </FilterListWrapper>
      <ScrollListWrapper>
        <CategoryList />
        <Divider />
        <SubscriptionList />
        <RoomCalendarList />
      </ScrollListWrapper>
    </LNBContainer>
  );
};

export default memo(LNB);
