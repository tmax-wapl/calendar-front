import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { DatePicker as Compo } from '@common/components/DatePicker/externals/DatePicker';

export default {
  title: 'Calendar/DatePicker',
  component: Compo,
  argTypes: {
    open: {
      type: 'boolean',
      defaultValue: true,
      description: 'DatePicker 오픈 여부',
    },
    date: {
      type: { name: 'string', require: true },
      description: 'Date 객체 값을 넣어주세요.',
    },
    mode: {
      control: 'radio',
      options: ['modal', 'inline'],
      defaultValue: 'modal',
      description: 'modal 모드와 컴포넌트 내부에 들어가는 모드',
    },
    disabledDateList: {
      control: 'multi-select',
      options: ['2023-09-19', '2023-09-20', '2023-09-21'],
      description: 'disabled 처리하고 싶은 날짜의 목록을 yyyy-mm-dd 배열 값으로 넣어주세요.',
    },
    onDateChange: {
      type: 'function',
      description: '날짜 선택하면 Date 객체가 반환 됩니다.',
      action: 'clicked',
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
} as Meta<typeof Compo>;

export const DatePicker = args => (
  <WaplUiProvider>
    <Compo open date={new Date()} {...args} style={{ transform: 'translate(0,0)' }} />
  </WaplUiProvider>
);
