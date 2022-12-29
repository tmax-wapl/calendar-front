import { memo } from 'react';
import { Icon } from '@wapl/ui';
import {
  LNBContainer,
  LNBHeader,
  DatePickerWrapper,
  FilterListWrapper,
  CategoryListWrapper,
  SubscriptionListWrapper,
  Divider,
} from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';
import FilterList from './FilterList';
import CategoryList from './CategoryList';
import SubscriptionList from './SubscriptionList';

const LNB = () => {
  return (
    <LNBContainer id="lnb">
      <LNBHeader>
        <Icon.CalendarColor className="mr-8" width={32} height={32} />
        캘린더
      </LNBHeader>
      <DatePickerWrapper>
        <DatePicker backgroundColor="#F8F9FA" />
      </DatePickerWrapper>
      <FilterListWrapper>
        <FilterList />
      </FilterListWrapper>
      <CategoryListWrapper>
        <Divider />
        <CategoryList />
      </CategoryListWrapper>
      <SubscriptionListWrapper>
        <Divider />
        <SubscriptionList />
      </SubscriptionListWrapper>
    </LNBContainer>
  );
};

export default memo(LNB);
