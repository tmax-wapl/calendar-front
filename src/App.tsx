import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  return (
    <WaplUiProvider>
      <div id="appProvider">
        <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
      </div>
    </WaplUiProvider>
  );
};

export default App;
