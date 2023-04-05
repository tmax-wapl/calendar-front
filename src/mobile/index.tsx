import { useCalendarStores } from '@/stores/StoreProvider';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, Link } from 'react-router-dom';
import { ROUTES } from '@common/constants/routes';
import { ContextMenu, Dialog } from '..';
import { Observer } from 'mobx-react-lite';
import CalendarLayout from '@mcomponents/layout/CalendarLayout';
import Calendar from '@mcomponents/body/Calendar';
import { PageTransitionRoutes } from '@wapl/ui';

const MobileApp: React.FC = () => {
  const { uiStore } = useCalendarStores();

  const PageRoutes = () => {
    const location = useLocation();
    // TODO: route 변경 예정
    // AppBar 컴포넌트 달아야 함
    return (
      <>
        <PageTransitionRoutes Routes={Routes} Route={Route} location={location}>
          <Route path={`main/${ROUTES.CREATE}`} element={<div>handleView</div>} />
          <Route path={`main/${ROUTES.UPDATE}`} element={<div>handleView</div>} />
          <Route path={`main/${ROUTES.DETAIL}`} element={<div>detailView</div>} />
          <Route path={`main/${ROUTES.SHARE}`} element={<div>shareView</div>} />
        </PageTransitionRoutes>
      </>
    );
  };

  return (
    <Router basename="/">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/main">home</Link>
        <Link to="/main/view-mode/dayGridMonth/create">create</Link>
        <Link to="/main/view-mode/dayGridMonth/update">update</Link>
        <Link to="/main/view-mode/dayGridMonth/detail">detail</Link>
        <Link to="/main/share">share</Link>
      </div>
      <Routes>
        <Route path={ROUTES.MAIN} element={<CalendarLayout />} />
      </Routes>
      <PageRoutes />
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
    </Router>
  );
};

export default MobileApp;
