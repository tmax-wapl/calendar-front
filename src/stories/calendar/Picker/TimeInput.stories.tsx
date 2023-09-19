import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimeInput as Compo } from '@common/components/TimeInput/externals/TimeInput';

export default {
  title: 'Calendar/TimePicker',
  component: Compo,
  argTypes: {
    date: {
      description: 'Date 객체 값을 넣어주세요.',
    },
    height: {
      control: {
        type: 'number',
        min: 200,
        max: 1000,
        step: 100,
      },
      description: '시간 선택시 전체 보여지는 아이템의 높이',
      defaultValue: 200,
    },
    inValidTime: {
      type: 'boolean',
      defaultValue: false,
      description: 'Date invalid 여부',
    },
    onChange: {
      type: 'function',
      description: '날짜 변경하면 Date 객체가 반환 됩니다.',
      action: 'clicked',
    },
  },
} as Meta<typeof TimeInput>;

export const TimeInput = args => (
  <WaplUiProvider>
    <Compo value={new Date()} {...args} />
  </WaplUiProvider>
);
