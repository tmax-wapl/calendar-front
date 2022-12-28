import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import CalendarLayout from '@wcomponents/layout/CalendarLayout';
import Calendar from '@wcomponents/CalendarView';
import Share from '@wcomponents/ShareView';
import EventList from '@wcomponents/EventListView';
import Detail from '@wcomponents/EventDetailView';
import EventHandleView from '@wcomponents/EventHandleView';
import { ROUTES } from '@constants/routes';
import { Observer } from 'mobx-react-lite';
import { Dialog } from '@common/components/Dialog';
import { InputDialog } from '@common/components/InputDialog';
import { useCalendarStores } from '@/stores/StoreProvider';

const WebApp: React.FC = () => {
  const { uiStore } = useCalendarStores();
  return (
    <Router basename="/">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex' }}>
          <Link to={ROUTES.PATH_MAIN} className="link">
            Main
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to={ROUTES.PATH_CREATE} className="link">
            Main/Create
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to={ROUTES.PATH_DETAIL} className="link">
            Main/Detail/:id
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to={ROUTES.PATH_SHARE} className="link">
            Share
          </Link>
        </div>
      </div>
      <Routes>
        <Route element={<CalendarLayout />}>
          <Route path="*" element={<Navigate to={ROUTES.PATH_MAIN} replace />} />
          <Route path={ROUTES.MAIN} element={<Calendar />}>
            <Route path={ROUTES.DAY} element={<EventList />} />
            <Route path={ROUTES.CREATE} element={<EventHandleView action="create" />} />
            <Route path={ROUTES.DETAIL} element={<Detail />} />
          </Route>
          <Route path={ROUTES.SHARE} element={<Share />} />
        </Route>
      </Routes>
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
      <Observer>{() => uiStore.inputDialogInfo && <InputDialog />}</Observer>
    </Router>
  );
};

export default WebApp;
