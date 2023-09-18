import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { DatePicker as Compo } from '@common/components/DatePicker/externals/DatePicker';

export default {
  title: 'Calendar/DatePicker',
  component: Compo,
  args: {},
  // argTypes: {
  //   mode: {
  //     control: 'radio',
  //     options: ['modal', 'inline'],
  //   },
  // },
} as Meta<typeof Compo>;

export const DatePicker = args => (
  <WaplUiProvider>
    <Compo open date={new Date()} {...args} style={{ transform: 'translate(0,0)' }} />
  </WaplUiProvider>
);
