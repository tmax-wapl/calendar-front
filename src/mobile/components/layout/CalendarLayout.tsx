import Calendar from '../body/Calendar';
import CalendarHeader from '../header/CalendarHeader';

const CalendarLayout = () => {
  return (
    <div>
      <CalendarHeader />
      <Calendar />
      <div>Splitter</div>
    </div>
  );
};

export default CalendarLayout;
