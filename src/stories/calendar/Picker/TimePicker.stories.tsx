import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimePicker as Compo } from '@common/components/TimePicker/externals/TimePicker';

export default {
  title: 'Calendar/TimePicker',
  component: Compo,
  args: {},
} as Meta<typeof TimePicker>;

export const TimePicker = args => (
  <WaplUiProvider>
    <Compo value={new Date()} {...args} />
  </WaplUiProvider>
);
