import React, { useState, useEffect } from 'react';
import { WaplShellProvider } from './stores/StoreProvider';
import App from './App';

const WaplShellApp: React.FC = () => {
  const [data, setData] = useState<{ eventId: number; start: string } | 'backEvent'>(null);

  const handleRouting = ({ data: messageData }: MessageEvent) => {
    if (messageData.type === 'shell:onBackButton') {
      setData('backEvent');
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
    window.parent.postMessage({ type: 'topping:ready', appId: window.APP_ID }, '*');
    return () => window.removeEventListener('message', handleRouting);
  }, []);

  return (
    <WaplShellProvider>
      <App data={data} />
    </WaplShellProvider>
  );
};

export default WaplShellApp;
