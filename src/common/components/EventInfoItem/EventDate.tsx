import React from 'react';
import { DateTime } from 'luxon';
import { Icon, Switch } from '@wapl/ui';
import { EventDateContainer, ItemTitleContainer } from './EventDate.style';
import EventDateItem from './EventDateItem';

interface Props {
  allDay?: boolean;
  start: DateTime;
  end: DateTime;
  onAllDayChange?: (value: boolean) => void;
  onStartChange?: (value: DateTime) => void;
  onEndChange?: (value: DateTime) => void;
}

const EventDate = ({
  allDay = false,
  start = DateTime.now(),
  end = DateTime.now().plus({ minutes: 30 }),
  onAllDayChange,
  onStartChange,
  onEndChange,
}: Props) => {
  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAllDayChange(e.target.checked);
  };

  const handleStartChange = (date: DateTime) => {
    onStartChange(date);
    onEndChange(date.plus(end.diff(start)));
  };

  const handleEndChange = (date: DateTime) => {
    onEndChange(date);
  };

  return (
    <EventDateContainer>
      <ItemTitleContainer>
        <Icon.TimeLine className="mr-8" width={20} height={20} />
        종일
        <Switch size="small" checked={allDay ?? false} onChange={handleSwitch} />
      </ItemTitleContainer>
      <EventDateItem title="시작일" date={start} allDay={allDay} onChange={handleStartChange} />
      <EventDateItem
        title="마감일"
        date={end}
        allDay={allDay}
        onChange={handleEndChange}
        isDateInvalid={start.startOf('day') > end.startOf('day')}
        isTimeInvalid={start > start.set({ hour: end.hour, minute: end.minute })}
      />
    </EventDateContainer>
  );
};

export default EventDate;
