import Widget from '../components/CalendarWidget';

interface Props {
  token?: string;
  userId?: number;
}

export const CalendarWidget: React.FC<Props> = ({ token, userId }: Props) => {
  return <Widget token={token} userId={userId} />;
};

CalendarWidget.displayName = 'CalendarWidget';
