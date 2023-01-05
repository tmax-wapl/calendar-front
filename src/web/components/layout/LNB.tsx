import { memo } from 'react';
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
import { useCalendarStores } from '@/stores/StoreProvider';

const LNB = () => {
  const { uiStore } = useCalendarStores();
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
