import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimeSpinnerPicker as Compo } from '@common/components/SpinnerPicker/externals/TimeSpinnerPicker';

export default {
  title: 'Calendar/SpinnerPicker',
  component: Compo,
  args: {},
} as Meta<typeof TimeSpinnerPicker>;

export const TimeSpinnerPicker = args => (
  <WaplUiProvider>
    <Compo open date={new Date()} {...args} />
  </WaplUiProvider>
);
