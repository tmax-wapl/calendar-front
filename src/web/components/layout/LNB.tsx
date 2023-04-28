import { memo } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Icon } from '@wapl/ui';
import { LNBContainer, LNBHeader, DatePickerWrapper, FilterListWrapper, ScrollListWrapper, Divider } from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';
import FilterList from './FilterList';
import CategoryList from './CategoryList';
import OtherCalendarList from './OtherCalendarList';
import { Observer } from 'mobx-react-lite';
import OrgCalendarList from './OrgCalendarList';

const LNB = () => {
  const { uiStore, calendarStore } = useCalendarStores();

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
        {calendarStore.roomCalendarList.some(cal => cal.type === 'org') ? (
          <>
            <OrgCalendarList />
            <Divider />
          </>
        ) : null}
        <OtherCalendarList />
      </ScrollListWrapper>
    </LNBContainer>
  );
};

export default memo(LNB);
