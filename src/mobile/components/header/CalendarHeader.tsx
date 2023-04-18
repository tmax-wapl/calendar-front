import { memo, useEffect, useState } from 'react';
import { Icon, styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarHeaderContainer, RightContainer, TodayButton } from './CalendarHeader.style';
import DateSpinnerPicker from '@/common/components/SpinnerPicker/DateSpinnerPicker';
import { observer } from 'mobx-react-lite';

export const DateHeader = observer(({ togglePicker }: { togglePicker: () => void }) => {
  const { uiStore } = useCalendarStores();

  return (
    <DateHeaderWrapper onClick={togglePicker}>
      <TextButton>{uiStore.dateRange.view.toFormat('yyyy.LL')}</TextButton>
    </DateHeaderWrapper>
  );
});

const CalendarHeader = () => {
  const { uiStore } = useCalendarStores();
  const [titleDate, setTitleDate] = useState<DateTime>(DateTime.now());
  const [isDateSpinnerOpen, setIsDateSpinnerOpen] = useState(false);

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

  const togglePicker = () => setIsDateSpinnerOpen(!isDateSpinnerOpen);

  useEffect(() => {
    handleDate();
  }, [titleDate]);

  return (
    <CalendarHeaderContainer>
      <DateHeader togglePicker={togglePicker} />
      <RightContainer>
        <BookMarkIcon />
        <TodayButton onClick={handleToday}>오늘</TodayButton>
      </RightContainer>
      {isDateSpinnerOpen && (
        <DateSpinnerPicker
          date={uiStore.dateRange.view}
          onDateChange={selectedDate => uiStore.handleDateClick(selectedDate, togglePicker)}
          onOutsideClick={togglePicker}
        />
      )}
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;

const DateHeaderWrapper = styled.div`
  display: flex;
`;

export const TextButton = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 6px;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  height: 18px;
`;
