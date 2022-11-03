import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import CalendarLayout from '@wcomponents/layout/CalendarLayout';
import Calendar from '@wcomponents/CalendarView';
import Share from '@wcomponents/ShareView';
import EventList from '@wcomponents/EventListView';
import Detail from '@wcomponents/DetailView';

const WebApp: React.FC = () => {
  return (
    <Router basename="/">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex' }}>
          <Link to="/main" className="link">
            Main
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to="/main/create" className="link">
            Main/Create
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to="/main/detail/3" className="link">
            Main/Detail/:detailId
          </Link>
        </div>
        <div style={{ display: 'flex' }}>
          <Link to="/share" className="link">
            Share
          </Link>
        </div>
      </div>
      <Routes>
        <Route element={<CalendarLayout />}>
          <Route path="*" element={<Navigate to={'/main'} replace />} />
          <Route path="main" element={<Calendar />}>
            <Route path="create" element={<EventList />} />
            <Route path="detail/:detailId" element={<Detail />} />
          </Route>
          <Route path="share" element={<Share />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default WebApp;
