import { memo } from 'react';
import { Icon } from '@wapl/ui';
import { LNBContainer, LNBHeader, LNBBody } from './LNB.style';
import DatePicker from '@common/components/DatePicker/DatePicker';
import FilterList from './FilterList';

const LNB = () => {
  return (
    <LNBContainer id="lnb">
      <LNBHeader>
        <Icon.CalendarColor className="mr-8" width={32} height={32} />
        캘린더
      </LNBHeader>
      <LNBBody>
        <DatePicker backgroundColor="#eeeeee" />
        <FilterList />
      </LNBBody>
    </LNBContainer>
  );
};

export default memo(LNB);
