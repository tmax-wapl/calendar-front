import { Meta } from '@storybook/react';
import { WaplUiProvider } from '@wapl/ui';
import { DateItem as Compo } from '@common/components/DatePicker/externals/DateItem';

export default {
  title: 'Calendar/DatePicker',
  component: Compo,
  argTypes: {
    date: {
      description: 'Date 값을 넣어주세요.',
    },
    isDateInvalid: {
      type: 'boolean',
      defaultValue: false,
      description: 'Date invalid 여부',
    },
    inValidTitle: {
      type: 'string',
      defaultValue: '시작일과 같거나 이후로 설정해 주세요.',
      description: 'Date invalid 시 hover text',
    },
    isMasked: {
      type: 'boolean',
      defaultValue: false,
      description: 'Date 형식 변환 여부',
    },
    dateFormat: {
      control: 'radio',
      options: ['yyyy.LL.dd', 'yyyy.mm.dd', 'yyyy-LL-dd', 'dd/LL/yyyy', 'dd/mm/aaaa'],
      description: 'Date 지원하는 형식들',
    },
  },
} as Meta<typeof DateItem>;

export const DateItem = args => (
  <WaplUiProvider>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Compo date={new Date()} {...args} style={{ minWidth: '120px' }} />
    </div>
  </WaplUiProvider>
);
