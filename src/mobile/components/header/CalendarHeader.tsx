import { memo, useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { DateTime } from 'luxon';
import { useCalendarStores } from '@/stores/StoreProvider';
import {
  CalendarHeaderContainer,
  DateHeaderWrapper,
  IconButton,
  RightContainer,
  TextButton,
  TodayButton,
} from './CalendarHeader.style';
import DateSpinnerPicker from '@/common/components/SpinnerPicker/DateSpinnerPicker';
import { observer } from 'mobx-react-lite';

export const DateHeader = observer(({ togglePicker }: { togglePicker: () => void }) => {
  const { uiStore } = useCalendarStores();

  return (
    <DateHeaderWrapper onClick={togglePicker}>
      <TextButton>{uiStore.dateRange.view.toFormat('yyyy.LL')}</TextButton>
      <Icon.ArrowBottomLine width={20} height={20} />
    </DateHeaderWrapper>
  );
});

const CalendarHeader = () => {
  const { uiStore } = useCalendarStores();
  const [titleDate, setTitleDate] = useState<DateTime>(DateTime.now());
  const [isDateSpinnerOpen, setIsDateSpinnerOpen] = useState(false);
  const [importance, setImportance] = useState(false);

  const BookMarkIcon = memo(({ color, onClick }: { color: string; onClick: () => void }) => {
    return (
      <IconButton onClick={onClick}>
        <Icon.BookmarkFill
          width={20}
          height={20}
          color={color}
          {...{ style: { minWidth: '20px', margin: '5px 14px 0px 0px' } }}
        />
      </IconButton>
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

  const toggleImportance = () => {
    setImportance(!importance);
    uiStore.setImportanceChecked(!importance);
  };

  useEffect(() => {
    handleDate();
  }, [titleDate]);

  return (
    <CalendarHeaderContainer>
      <DateHeader togglePicker={togglePicker} />
      <RightContainer>
        <BookMarkIcon onClick={toggleImportance} color={importance ? '#fcbb00' : '#bdc1c6'} />
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
