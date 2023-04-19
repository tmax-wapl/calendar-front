import { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { Checkbox, Icon, Tooltip } from '@wapl/ui';
import { ItemContainer, CheckBoxWrapper, ButtonWarpper, ErrorIcon } from './Item.style';

interface Props {
  category: CalendarModel;
}

const Item = observer(({ category }: Props) => {
  const { uiStore, calendarStore } = useCalendarStores();

  const handleCheckedChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    await calendarStore.updateCalendar(category.id, { checkFlag: checked });
    calendarStore.updateCalendarChecked(category.id, checked);
    uiStore.changeDateRange();
  };

  return (
    <ItemContainer key={category.id} main={category.mainFlag || category.type === 'share'}>
      <CheckBoxWrapper
        calendarcolor={category.color}
        control={<Checkbox checked={category.checkFlag} onChange={handleCheckedChange} />}
        label={category.name || ''}
        type={category.type}
      />
      {category.type === 'url' && (
        <>
          {category.subscribeStatus !== 'success' && (
            <Tooltip
              title={category.subscribeStatus === 'fail' ? '원본이 삭제된 캘린더입니다.' : '잠시 후 시도해 주세요.'}
            >
              <ErrorIcon width={20} height={20} color=" #F44336" />
            </Tooltip>
          )}
        </>
      )}
      <ButtonWarpper>
        <Icon.ArrowFrontLine width={20} height={20} color="#BDC1C6" />
      </ButtonWarpper>
    </ItemContainer>
  );
});

export default memo(Item, (prev, next) => prev.category === next.category);
