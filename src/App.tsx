import React from 'react';
import { WaplUiProvider } from '@wapl/ui';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  return (
    <WaplUiProvider>
      <div id="appProvider">
        <div id="storeProvider">{isMobile ? <Mobile /> : <Web />}</div>
      </div>
    </WaplUiProvider>
  );
};

export default App;
