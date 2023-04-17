import { useCalendarStores } from '@/stores/StoreProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTES } from '@common/constants/routes';
import { Dialog } from '..';
import { Observer } from 'mobx-react-lite';
import CalendarLayout from '@mcomponents/layout/CalendarLayout';
import FAB from './components/FAB';
import PageRoutes from './components/layout/PageRoutes';

const MobileApp: React.FC = () => {
  const { uiStore } = useCalendarStores();

  return (
    <Router basename="/">
      <Routes>
        <Route path={ROUTES.MAIN} element={<CalendarLayout />} />
      </Routes>
      <Observer>{() => (uiStore.pageDialogInfo ? <PageRoutes /> : <FAB />)}</Observer>
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
    </Router>
  );
};

export default MobileApp;
