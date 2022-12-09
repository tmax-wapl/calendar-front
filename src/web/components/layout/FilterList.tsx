import { useState } from 'react';
import { FilterContainer } from './FilterList.style';
import { Checkbox } from '@wapl/ui';
import { CheckBoxWrapper } from './FilterList.style';

const FilterList = () => {
  const [checkList, setCheckList] = useState<Array<boolean>>([false, true, true]);
  const filterItems = [
    { label: '중요 일정만 표시', type: 'importance' },
    { label: '공휴일 표시', type: 'holiday' },
    { label: '음력 날짜 표시', type: 'lunar' },
  ];

  return (
    <FilterContainer>
      {filterItems.map((filter, index) => (
        <CheckBoxWrapper
          key={filter.type}
          control={
            <Checkbox
              checked={checkList[index]}
              onChange={e =>
                setCheckList(prevlist => prevlist.map((item, idx) => (idx === index ? e.target.checked : item)))
              }
            />
          }
          label={filter.label}
        />
      ))}
    </FilterContainer>
  );
};

export default FilterList;
