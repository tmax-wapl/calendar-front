import React from 'react';
import { StoreProvider } from './stores/StoreProvider';
import { WaplUiProvider } from '@wapl/ui';
import CalendarProvider from '@contexts/CalendarContext';
import { MODE } from './common/constants/common';
import Web from './web';
import Mobile from './mobile';

const App: React.FC = () => {
  const isMobile = false;

  // TODO: userId 가져와서 연동하기
  return (
    <WaplUiProvider>
      <CalendarProvider mode={MODE.FULL} userId={6}>
        <StoreProvider>{isMobile ? <Mobile /> : <Web />}</StoreProvider>
      </CalendarProvider>
    </WaplUiProvider>
  );
};

export default App;
