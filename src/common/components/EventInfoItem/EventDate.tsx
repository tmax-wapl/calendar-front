import React from 'react';
import { DateTime } from 'luxon';
import { Icon, Switch } from '@wapl/ui';
import { EventDateContainer, ItemTitleContainer } from './EventDate.style';
import EventDateItem from './EventDateItem';

interface ValueProps {
  allDay?: boolean;
  startDate: DateTime;
  endDate: DateTime;
}

interface Props extends ValueProps {
  onChange?: (value: Partial<ValueProps>) => void;
}

const EventDate = ({
  allDay = false,
  startDate = DateTime.now(),
  endDate = DateTime.now().plus({ minutes: 30 }),
  onChange,
}: Props) => {
  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ allDay: e.target.checked });
  };

  const handleStartChange = (date: DateTime) => {
    onChange({ startDate: date });
  };

  const handleEndChange = (date: DateTime) => {
    onChange({ endDate: date });
  };

  return (
    <EventDateContainer>
      <ItemTitleContainer>
        <Icon.Add1Line className="mr-8" color="#202124" width={20} height={20} />
        종일
        <Switch size="small" checked={allDay} onChange={handleSwitch} />
      </ItemTitleContainer>
      <EventDateItem title="시작일" date={startDate} allDay={allDay} onChange={handleStartChange} />
      <EventDateItem title="마감일" date={endDate} allDay={allDay} onChange={handleEndChange} />
    </EventDateContainer>
  );
};

export default EventDate;
