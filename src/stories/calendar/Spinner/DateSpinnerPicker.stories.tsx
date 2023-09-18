import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { DateSpinnerPicker as Compo } from '@common/components/SpinnerPicker/externals/DateSpinnerPicker';

export default {
  title: 'Calendar/SpinnerPicker',
  component: Compo,
  args: {},
} as Meta<typeof DateSpinnerPicker>;

export const DateSpinnerPicker = args => (
  <WaplUiProvider>
    <Compo open date={new Date()} {...args} />
  </WaplUiProvider>
);
