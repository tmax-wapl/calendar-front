import React, { useState, useEffect } from 'react';
import { useCalendarStores, WaplShellProvider } from './stores/StoreProvider';
import App from './App';

export interface MessageProps {
  data: { eventId: number; start: string };
}

const WaplShellApp: React.FC = () => {
  const [data, setData] = useState<{ eventId: number; start: string }>(null);
  const { uiStore } = useCalendarStores();

  const handleRouting = ({ data: messageData }: MessageEvent) => {
    if (messageData.type === 'shell:onBackButton') {
      uiStore.setBackEvent(true);
      return;
    }
    if (
      messageData.type !== 'topping:onStart' ||
      (messageData.args?.from !== 'noti' && messageData.args?.from !== 'search' && messageData.args?.from !== 'widget')
    )
      return;
    setData(messageData.args);
  };

  useEffect(() => {
    window.addEventListener('message', handleRouting);
    window.parent.postMessage({ type: 'topping:ready', appId: '4' }, '*');
    return () => window.removeEventListener('message', handleRouting);
  }, []);

  return (
    <WaplShellProvider>
      <App data={data} />
    </WaplShellProvider>
  );
};

export default WaplShellApp;
