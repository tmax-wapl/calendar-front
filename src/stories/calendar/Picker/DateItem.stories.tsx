import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { DateItem as Compo } from '@common/components/DatePicker/externals/DateItem';

export default {
  title: 'Calendar/DatePicker',
  component: Compo,
  args: {},
} as Meta<typeof DateItem>;

export const DateItem = args => (
  <WaplUiProvider>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Compo date={new Date()} {...args} style={{ minWidth: '120px' }} />
    </div>
  </WaplUiProvider>
);
