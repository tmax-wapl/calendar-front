import { DateTime } from 'luxon';
import { CSSProperties } from 'react';
import TimeItemContainer from './TimeItemContainer';

interface Props {
  date: DateTime;
  isTimeInvalid?: boolean;
  onChange?: (date: DateTime) => void;
  style?: CSSProperties;
}

export const TimeItem = ({ date, isTimeInvalid, onChange, style }: Props) => {
  return <TimeItemContainer date={date} isTimeInvalid={isTimeInvalid} onChange={onChange} style={style} />;
};
