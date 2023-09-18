import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimeInput as Compo } from '@common/components/TimeInput/externals/TimeInput';

export default {
  title: 'Calendar/TimePicker',
  component: Compo,
  args: {},
} as Meta<typeof TimeInput>;

export const TimeInput = args => (
  <WaplUiProvider>
    <Compo value={new Date()} {...args} />
  </WaplUiProvider>
);
