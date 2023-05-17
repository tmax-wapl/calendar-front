import React, { useState, useEffect } from 'react';
import { WaplShellProvider } from './stores/StoreProvider';
import App from './App';

const WaplShellApp: React.FC = () => {
  const [data, setData] = useState<{ eventId: number; start: string }>(null);

  const handleRouting = ({ data: messageData }: MessageEvent) => {
    if (messageData.type !== 'shell:runTopping' || messageData.options?.from !== 'noti') return;
    setData(messageData.options);
  };

  useEffect(() => {
    window.addEventListener('message', handleRouting);
    return () => window.removeEventListener('message', handleRouting);
  }, []);

  return (
    <WaplShellProvider>
      <App data={data} />
    </WaplShellProvider>
  );
};

export default WaplShellApp;
