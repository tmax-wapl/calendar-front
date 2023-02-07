import React from 'react';
import { WaplShellProvider } from './stores/StoreProvider';
import App from './App';

const WaplShellApp: React.FC = () => {
  return (
    <WaplShellProvider>
      <App />
    </WaplShellProvider>
  );
};

export default WaplShellApp;
