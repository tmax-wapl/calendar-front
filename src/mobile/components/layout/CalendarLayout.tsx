import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';

const CalendarLayout = () => {
  return (
    <div style={{ height: '100%' }}>
      <CalendarHeader />
      <SplitLayout />
    </div>
  );
};

export default CalendarLayout;
