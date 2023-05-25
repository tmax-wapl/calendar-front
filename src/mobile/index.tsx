import { useCalendarStores } from '@/stores/StoreProvider';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { Dialog } from '..';
import { Observer } from 'mobx-react-lite';
import CalendarLayout from '@mcomponents/layout/CalendarLayout';
import EventSearchView from '@mcomponents/Search/EventSearchView';
import PageRoutes from './components/layout/PageRoutes';

const MobileApp: React.FC = () => {
  const { uiStore } = useCalendarStores();

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
