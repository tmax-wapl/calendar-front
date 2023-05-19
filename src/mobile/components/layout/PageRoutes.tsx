import { FullScreenDialog } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import EventDetailView from '../EventDetailView';
import EventHandleView from '../EventHandleView';
import CalendarManageView from '../CalendarManageView/CalendarManageView';
import CalendarSettingView from '../CalendarManageView/CalendarSettingView';
import UrlSubscribeView from '../CalendarManageView/UrlSubscribeView';
import { useEffect } from 'react';

const PageRoutes = () => {
  const { uiStore } = useCalendarStores();

  const Page = () => {
    switch (uiStore.pageDialogInfo) {
      case 'detail':
        return <EventDetailView />;
      case 'create':
        return <EventHandleView action="create" />;
      case 'update':
        return <EventHandleView action="update" />;
      case 'calendarManage':
        return <CalendarManageView />;
      case 'calendarSetting':
        return <CalendarSettingView />;
      case 'addSubscribe':
        return <UrlSubscribeView />;
      default:
        return;
    }
  };

  const handleHistoryBack = () => uiStore.setPageDialogInfo(null);

  useEffect(() => {
    window.addEventListener('popstate', handleHistoryBack);
    return () => window.removeEventListener('popstate', handleHistoryBack);
  }, []);

  return (
    <FullScreenDialog open sx={{ zIndex: 1100 }}>
      <Page />
    </FullScreenDialog>
  );
};

export default PageRoutes;
