import { useEffect } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { Dialog } from '@common/components/Dialog';
import { Observer } from 'mobx-react-lite';
import CalendarLayout from '@mcomponents/layout/CalendarLayout';
import EventSearchView from '@mcomponents/Search/EventSearchView';
import PageRoutes from './components/layout/PageRoutes';

interface Props {
  data: { eventId: number; start: string };
}

const MobileApp = ({ data }: Props) => {
  const { uiStore } = useCalendarStores();

  useEffect(() => {
    if (!data) return;
    uiStore.setNotiData(data);
  }, [data]);

  return (
    <Router basename="/">
      <Routes>
        <Route path={ROUTES.MOBILE.MAIN} element={<CalendarLayout />} />
        <Route path="*" element={<Navigate to={ROUTES.MOBILE.PATH_MAIN} replace />} />
        <Route path={ROUTES.MOBILE.SEARCH} element={<EventSearchView />} />
      </Routes>
      <Observer>{() => uiStore.pageDialogInfo && <PageRoutes />}</Observer>
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
    </Router>
  );
};

export default MobileApp;
