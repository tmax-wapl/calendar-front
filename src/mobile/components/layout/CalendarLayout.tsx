import Calendar from '../body/Calendar';
import CalendarHeader from '../header/CalendarHeader';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { useEffect, useRef } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';

const CalendarLayout = () => {
  const { uiStore } = useCalendarStores();

  const handleDragEnd = () => {
    uiStore.mainApi.updateSize();
  };

  return (
    <div style={{ height: '100%' }}>
      <CalendarHeader />
      <SplitterLayout
        percentage
        vertical
        secondaryInitialSize={0}
        primaryMinSize={13}
        secondaryMinSize={0}
        onDragEnd={handleDragEnd}
      >
        <Calendar />
        <div style={{ height: '100%', background: '#F8F9FA' }}>Panel 2 영역</div>
      </SplitterLayout>
    </div>
  );
};

export default CalendarLayout;
