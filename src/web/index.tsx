import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import CalendarLayout from '@wcomponents/layout/CalendarLayout';
import Calendar from '@wcomponents/CalendarView';
import Share from '@wcomponents/ShareView';
import EventList from '@wcomponents/EventListView';
import Detail from '@wcomponents/EventDetailView';
import EventHandleView from '@wcomponents/EventHandleView';
import EventSearchView from '@wcomponents/EventSearchView';
import { ROUTES } from '@constants/routes';
import { Observer } from 'mobx-react-lite';
import { Dialog } from '@/common/components/Dialog';
import { ContextMenu } from '@/common/components/ContextMenu';
import { useCalendarStores } from '@/stores/StoreProvider';

interface Props {
  data: { eventId: number; start: string } | 'backEvent';
}

const WebApp = ({ data }: Props) => {
  const { uiStore } = useCalendarStores();

  useEffect(() => {
    if (!data) return;
    if (data !== 'backEvent') uiStore.setNotiData(data);
  }, [data]);

  return (
    <Router basename="/">
      <Routes>
        <Route element={<CalendarLayout />}>
          <Route path="*" element={<Navigate to={ROUTES.WEB.PATH_MAIN} replace />} />
          <Route path={ROUTES.WEB.MAIN} element={<Calendar />}>
            <Route path={ROUTES.WEB.DAY} element={<EventList />} />
            <Route path={ROUTES.WEB.CREATE} element={<EventHandleView action={'create'} />} />
            <Route path={ROUTES.WEB.UPDATE} element={<EventHandleView action={'update'} />} />
            <Route path={ROUTES.WEB.DETAIL} element={<Detail />} />
            <Route path={ROUTES.WEB.SEARCH} element={<EventSearchView />} />
          </Route>
          <Route path={ROUTES.WEB.SHARE} element={<Share />} />
        </Route>
      </Routes>
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
      <Observer>{() => uiStore.contextClickArg && <ContextMenu />}</Observer>
    </Router>
  );
};

export default WebApp;
