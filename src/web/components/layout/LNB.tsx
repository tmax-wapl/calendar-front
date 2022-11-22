import { memo } from 'react';
import { Icon } from '@wapl/ui';
import { LNBContainer, LNBHeader, LNBBody } from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';

const LNB = () => {
  return (
    <LNBContainer id="lnb">
      <LNBHeader>
        <Icon.CalendarColor width={32} height={32} />
        캘린더
      </LNBHeader>
      <LNBBody>
        <DatePicker />
      </LNBBody>
    </LNBContainer>
  );
};

export default memo(LNB);
