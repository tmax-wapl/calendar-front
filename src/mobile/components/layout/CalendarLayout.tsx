import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';

const CalendarLayout = () => {
  const handleSearchClick = () => {
    console.log('search');
  };

  const handleSettingClick = () => {
    console.log('setting');
  };

  const handleHomeClick = () => {
    console.log('home');
  };

  const headerRightSide: HeaderButton[] = [
    { action: 'search', onClick: handleSearchClick },
    { action: 'setting', onClick: handleSettingClick },
    { action: 'home', onClick: handleHomeClick },
  ];

  return (
    <div style={{ height: '100%' }}>
      <MainHeader title="내 캘린더" rightSide={headerRightSide} />
      <CalendarHeader />
      <SplitLayout />
    </div>
  );
};

export default CalendarLayout;
