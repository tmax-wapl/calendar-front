import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import CalendarLayout from '@wcomponents/layout/CalendarLayout';
import Calendar from '@wcomponents/CalendarView';
import Share from '@wcomponents/ShareView';
import EventList from '@wcomponents/EventListView';
import Detail from '@wcomponents/EventDetailView';
import { ROUTES } from '@constants/routes';

const WebApp: React.FC = () => {
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
            <Route path={ROUTES.CREATE} element={<EventList />} />
            <Route path={ROUTES.DETAIL} element={<Detail />} />
          </Route>
          <Route path={ROUTES.SHARE} element={<Share />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default WebApp;
