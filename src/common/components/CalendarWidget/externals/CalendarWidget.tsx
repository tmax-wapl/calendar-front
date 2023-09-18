import Widget from '../components/CalendarWidget';

interface Props {
  token?: string;
  userId?: number;
  getEventCount?: (eventCount: number) => void /** 일정의 개수 */;
}

export const CalendarWidget: React.FC<Props> = ({ token, userId, getEventCount }: Props) => {
  return <Widget token={token} userId={userId} getEventCount={getEventCount} />;
};

CalendarWidget.displayName = 'CalendarWidget';
