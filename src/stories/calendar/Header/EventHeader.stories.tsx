import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { BrowserRouter } from 'react-router-dom';
import Compo from '@wcomponents/header/EventHeader';

export default {
  title: 'Calendar/Header',
  component: Compo,
  args: {},
} as Meta<typeof EventHeader>;

export const EventHeader = args => (
  <WaplUiProvider>
    <BrowserRouter>
      <Compo {...args} />
    </BrowserRouter>
  </WaplUiProvider>
);
