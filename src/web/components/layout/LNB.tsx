import { memo, useEffect, useContext } from 'react';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Icon } from '@wapl/ui';
import {
  LNBContainer,
  LNBHeader,
  DatePickerWrapper,
  FilterListWrapper,
  ScrollListWrapper,
  CategoryListWrapper,
  SubscriptionListWrapper,
  Divider,
} from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';
import FilterList from './FilterList';
import CategoryList from './CategoryList';
import SubscriptionList from './SubscriptionList';

const LNB = () => {
  const { userId } = useContext(CalendarContext);
  const { calendarStore } = useCalendarStores();

  const fetchData = async (userId: number) => {
    const calendarList = await calendarStore.getCalendarList(userId, '2023-01-04', '2023-01-04');
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
        <DatePicker onDateClick={selectedDate => uiStore.handleDateClick(selectedDate)} backgroundColor="#F8F9FA" />
      </DatePickerWrapper>
      <FilterListWrapper>
        <FilterList />
      </FilterListWrapper>
      <ScrollListWrapper>
        <CategoryListWrapper>
          <Divider />
          <CategoryList />
        </CategoryListWrapper>
        <SubscriptionListWrapper>
          <Divider />
          <SubscriptionList />
        </SubscriptionListWrapper>
      </ScrollListWrapper>
    </LNBContainer>
  );
};

export default memo(LNB);
