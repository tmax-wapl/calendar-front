import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { TimeSpinnerPicker as Compo } from '@common/components/SpinnerPicker/externals/TimeSpinnerPicker';

export default {
  title: 'Calendar/SpinnerPicker',
  component: Compo,
  argTypes: {
    open: {
      type: 'boolean',
      defaultValue: true,
      description: 'DateSpinnerPicker 오픈 여부',
    },
    title: {
      type: 'string',
      description: 'DateSpinnerPicker 타이틀',
    },
    date: {
      description: 'Date 객체 값을 넣어주세요.',
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
} as Meta<typeof TimeSpinnerPicker>;

export const TimeSpinnerPicker = args => (
  <WaplUiProvider>
    <Compo open date={new Date()} {...args} />
  </WaplUiProvider>
);
