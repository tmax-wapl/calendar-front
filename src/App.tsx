import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  return (
    <div id="appProvider">
      <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
    </div>
  );
};

export default App;
