import { memo } from 'react';
import { Icon } from '@wapl/ui';
import { LNBContainer, LNBHeader, LNBBody } from './LNB.style';

const LNB = () => {
  return (
    <LNBContainer id="lnb">
      <LNBHeader>
        <Icon.CalendarColor width={32} height={32} />
        캘린더
      </LNBHeader>
      <LNBBody>미니캘린더</LNBBody>
    </LNBContainer>
  );
};

export default memo(LNB);
