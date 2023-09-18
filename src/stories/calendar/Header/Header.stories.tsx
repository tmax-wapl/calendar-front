import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { BrowserRouter } from 'react-router-dom';
import Compo from '@wcomponents/header/Header';

export default {
  title: 'Calendar/Header',
  component: Compo,
  args: {},
} as Meta<typeof Header>;

export const Header = args => (
  <WaplUiProvider>
    <BrowserRouter>
      <Compo {...args} />
    </BrowserRouter>
  </WaplUiProvider>
);
