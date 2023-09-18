import { Meta } from '@storybook/react';
import { CalendarWidget as Compo } from '@common/components/CalendarWidget/externals/CalendarWidget';

export default {
  title: 'Calendar/CalendarWidget',
  component: Compo,
  args: {},
} as Meta<typeof Compo>;

export const CalendarWidget: React.FC = () => {
  return <Compo />;
};
