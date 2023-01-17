import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox } from '@wapl/ui';
import { CheckBoxWrapper } from './FilterList.style';
import { observer } from 'mobx-react-lite';

const FilterList = observer(() => {
  const { uiStore } = useCalendarStores();
  const filterItems = [
    {
      label: '중요 일정만 표시',
      type: 'importance',
      checked: uiStore.isImportanceChecked,
      onChange: (e: any) => {
        uiStore.setImportanceChecked(e.target.checked);
      },
    },
    {
      label: '공휴일 표시',
      type: 'holiday',
      checked: uiStore.isHolidayChecked,
      onChange: (e: any) => {
        uiStore.setHolidayChecked(e.target.checked);
      },
    },
    {
      label: '음력 날짜 표시',
      type: 'lunar',
      checked: uiStore.isLunarChecked,
      onChange: (e: any) => {
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
