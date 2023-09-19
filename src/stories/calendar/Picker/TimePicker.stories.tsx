import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimePicker as Compo } from '@common/components/TimePicker/externals/TimePicker';

export default {
  title: 'Calendar/TimePicker',
  component: Compo,
  argTypes: {
    value: {
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
    onChange: {
      type: 'function',
      description: '날짜 변경하면 Date 객체가 반환 됩니다.',
      action: 'clicked',
    },
    onOutsideClick: {
      type: 'function',
      description: '바깥 영역 클릭시 DatePicker 가 close 됩니다.',
      action: 'clicked',
    },
  },
} as Meta<typeof TimePicker>;

export const TimePicker = args => (
  <WaplUiProvider>
    <Compo value={new Date()} {...args} />
  </WaplUiProvider>
);
