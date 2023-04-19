import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox } from '@wapl/ui';
import { FilterName } from './CalendarManageView.style';
import { CheckBoxWrapper } from './FilterList.style';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';

const FilterList = observer(() => {
  const { uiStore } = useCalendarStores();
  const filterItems = [
    {
      label: '공휴일',
      type: 'holiday',
      checked: uiStore.isHolidayChecked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        uiStore.setHolidayChecked(e.target.checked);
      },
    },
    {
      label: '음력 달력',
      type: 'lunar',
      checked: uiStore.isLunarChecked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        uiStore.setLunarChecked(e.target.checked);
      },
    },
  ];

  return (
    <>
      <FilterName>필터</FilterName>
      {filterItems.map(filter => (
        <CheckBoxWrapper
          key={filter.type}
          control={<Checkbox checked={filter.checked} onChange={e => filter.onChange(e)} />}
          label={filter.label}
        />
      ))}
    </>
  );
});

export default FilterList;
