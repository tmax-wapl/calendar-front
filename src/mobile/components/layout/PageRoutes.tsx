import { FullScreenDialog } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import EventDetailView from '../EventDetailView';
import EventHandleView from '../EventHandleView';

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
      default:
        return;
    }
  };

  return (
    <FullScreenDialog open sx={{ zIndex: 1100 }}>
      <Page />
    </FullScreenDialog>
  );
};

export default PageRoutes;
