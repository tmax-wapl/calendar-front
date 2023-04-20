import { memo } from 'react';
import { observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { Checkbox, Icon, Tooltip } from '@wapl/ui';
import { ItemContainer, CheckBoxWrapper, ButtonWarpper, ErrorIcon } from './Item.style';

interface Props {
  calendar: CalendarModel;
}

const Item = observer(({ calendar }: Props) => {
  const { uiStore, calendarStore } = useCalendarStores();

  const handleCheckedChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    await calendarStore.updateCalendar(calendar.id, { checkFlag: checked });
    calendarStore.updateCalendarChecked(calendar.id, checked);
    uiStore.changeDateRange();
  };

  const handleCalendarClick = (calendar: CalendarModel) => {
    calendarStore.setCalendar(calendar);
    uiStore.pageDialogInfo = 'calendarSetting';
  };

  return (
    <ItemContainer key={calendar.id} main={calendar.mainFlag || calendar.type === 'share'}>
      <CheckBoxWrapper
        calendarcolor={calendar.color}
        control={<Checkbox checked={calendar.checkFlag} onChange={handleCheckedChange} />}
        label={calendar.name || ''}
        type={calendar.type}
      />
      {calendar.type === 'url' && (
        <>
          {calendar.subscribeStatus !== 'success' && (
            <Tooltip
              title={calendar.subscribeStatus === 'fail' ? '원본이 삭제된 캘린더입니다.' : '잠시 후 시도해 주세요.'}
            >
              <ErrorIcon width={20} height={20} color=" #F44336" />
            </Tooltip>
          )}
        </>
      )}
      <ButtonWarpper onClick={() => handleCalendarClick(calendar)}>
        <Icon.ArrowFrontLine width={20} height={20} color="#BDC1C6" />
      </ButtonWarpper>
    </ItemContainer>
  );
});

export default memo(Item, (prev, next) => prev.calendar === next.calendar);
