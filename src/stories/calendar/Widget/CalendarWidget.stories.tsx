import { Meta } from '@storybook/react';
import { CalendarWidget as Compo } from '@common/components/CalendarWidget/externals/CalendarWidget';

export default {
  title: 'Calendar/CalendarWidget',
  component: Compo,
  argTypes: {
    token: {
      type: 'string',
      description: '로그인 한 유저의 token',
    },
    userId: {
      type: 'number',
      description: '로그인 한 유저의 userId',
    },
    getEventCount: {
      type: 'function',
      description: '오늘 날짜의 일정의 갯수를 반환 합니다.',
    },
  },
} as Meta<typeof Compo>;

export const CalendarWidget: React.FC = () => {
  return <Compo />;
};
