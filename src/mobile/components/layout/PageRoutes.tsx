import { FullScreenDialog } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import EventDetailView from '../EventDetailView';
import EventHandleView from '@/web/components/EventHandleView';
import CalendarManageView from '../CalendarManageView/CalendarManageView';

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
      case 'manage':
        return <CalendarManageView />;
      default:
        return;
    }
  };

  return (
    <FullScreenDialog open>
      <Page />
    </FullScreenDialog>
  );
};

export default PageRoutes;
