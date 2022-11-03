import React from 'react';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  return (
    <div id="appProvider">
      <div id="storeProvider">{isMobile ? <Mobile /> : <Web />}</div>
    </div>
  );
};

export default App;
