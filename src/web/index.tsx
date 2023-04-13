import { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { usePersonaStore, useUserStore } from '@wapl/core';
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

const WebApp: React.FC = () => {
  const personaStore = usePersonaStore();
  const { selectedPersona } = useUserStore();
  const { uiStore } = useCalendarStores();

  useEffect(() => {
    personaStore.getWsClient(selectedPersona.id).addHandler('SHARE_EVENT', () => uiStore.changeDateRange());
  }, [selectedPersona]);

  return (
    <Router basename="/">
      <Routes>
        <Route element={<CalendarLayout />}>
          <Route path="*" element={<Navigate to={ROUTES.PATH_MAIN} replace />} />
          <Route path={ROUTES.MAIN} element={<Calendar />}>
            <Route path={ROUTES.DAY} element={<EventList />} />
            <Route path={ROUTES.CREATE} element={<EventHandleView action={'create'} />} />
            <Route path={ROUTES.UPDATE} element={<EventHandleView action={'update'} />} />
            <Route path={ROUTES.DETAIL} element={<Detail />} />
            <Route path={ROUTES.SEARCH} element={<EventSearchView />} />
          </Route>
          <Route path={ROUTES.SHARE} element={<Share />} />
        </Route>
      </Routes>
      <Observer>{() => uiStore.dialogInfo && <Dialog />}</Observer>
      <Observer>{() => uiStore.contextClickArg && <ContextMenu />}</Observer>
    </Router>
  );
};

export default WebApp;
