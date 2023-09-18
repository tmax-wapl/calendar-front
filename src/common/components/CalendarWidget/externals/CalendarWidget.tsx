import Widget from '../components/CalendarWidget';

export interface WidgetProps {
  token?: string;
  userId?: number;
  getEventCount?: (eventCount: number) => void /** 일정의 개수 */;
}

export const CalendarWidget: React.FC<WidgetProps> = ({ token, userId, getEventCount }: WidgetProps) => {
  return <Widget token={token} userId={userId} getEventCount={getEventCount} />;
};

CalendarWidget.displayName = 'CalendarWidget';
