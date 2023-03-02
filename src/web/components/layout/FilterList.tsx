import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox } from '@wapl/ui';
import { CheckBoxWrapper } from './FilterList.style';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterList = observer(() => {
  const { eventStore, uiStore } = useCalendarStores();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const filterItems = [
    {
      label: '중요 일정만 표시',
      type: 'importance',
      checked: uiStore.isImportanceChecked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        uiStore.setImportanceChecked(e.target.checked);
        if (e.target.checked && pathname.includes('detail') && !eventStore.event.importance)
          navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      },
    },
    {
      label: '공휴일 표시',
      type: 'holiday',
      checked: uiStore.isHolidayChecked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        uiStore.setHolidayChecked(e.target.checked);
      },
    },
    {
      label: '음력 날짜 표시',
      type: 'lunar',
      checked: uiStore.isLunarChecked,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        uiStore.setLunarChecked(e.target.checked);
      },
    },
  ];

  return (
    <>
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
