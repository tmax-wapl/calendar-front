import { memo, useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { Observer } from 'mobx-react-lite';
import { DateTime } from 'luxon';
import DatePickerHeader from '@/common/components/DatePicker/DatePickerHeader';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarHeaderContainer, RightContainer, TodayButton } from './CalendarHeader.style';

const CalendarHeader = () => {
  const { uiStore } = useCalendarStores();
  const [titleDate, setTitleDate] = useState<DateTime>(DateTime.now());

  const BookMarkIcon = memo(() => {
    return (
      <Icon.BookmarkFill
        width={20}
        height={20}
        color="#bdc1c6"
        {...{ style: { minWidth: '20px', margin: '5px 14px 0px 0px' } }}
      />
    );
  });

  const handleToday = () => {
    const mainApi = uiStore.getApi();
    mainApi.today();
    uiStore.changeDateRange();
    setTitleDate(DateTime.now());
  };

  const handleDate = () => {
    uiStore.handleDateClick(titleDate);
    uiStore.setDateDay(titleDate);
  };

  useEffect(() => {
    handleDate();
  }, [titleDate]);

  return (
    <CalendarHeaderContainer>
      <Observer>
        {() => (
          <DatePickerHeader
            size={1}
            selectedDate={titleDate}
            titleDate={uiStore.dateRange.view}
            setTitleDate={setTitleDate}
            isMobile
          />
        )}
      </Observer>
      <RightContainer>
        <BookMarkIcon />
        <TodayButton onClick={handleToday}>오늘</TodayButton>
      </RightContainer>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
