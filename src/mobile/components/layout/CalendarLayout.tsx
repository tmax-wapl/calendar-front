import { useNavigate } from 'react-router-dom';
import { default as MainHeader, EventBarButton as HeaderButton } from '../header/EventBar';
import CalendarHeader from '../header/CalendarHeader';
import SplitLayout from './SplitLayout';
import { useCalendarStores } from '@/stores/StoreProvider';

const CalendarLayout = () => {
  const { uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleSettingClick = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleHomeClick = () =>
    window.parent.postMessage(
      {
        type: 'shell:runTopping',
        appId: 'home',
      },
      '*',
    );

  const headerLeftSide: HeaderButton[] = [{ action: 'home', onClick: handleHomeClick }];

  const headerRightSide: HeaderButton[] = [
    { action: 'search', onClick: handleSearchClick },
    { action: 'setting', onClick: handleSettingClick },
  ];

  return (
    <div style={{ height: '100%' }}>
      <MainHeader title="내 캘린더" leftSide={headerLeftSide} rightSide={headerRightSide} />
      <CalendarHeader />
      <SplitLayout />
    </div>
  );
};

export default CalendarLayout;
