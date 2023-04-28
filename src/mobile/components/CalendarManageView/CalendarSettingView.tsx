import { Icon } from '@wapl/ui';
import { useEffect, useRef, useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { ColorItem } from '@/common';
import EventBar from '../header/EventBar';
import {
  CalendarSettingViewContainer,
  CalendarName,
  IconButton,
  Input,
  SettingItem,
  Divider,
} from './CalendarSettingView.style';

const CalendarSettingView = () => {
  const { uiStore, calendarStore } = useCalendarStores();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(calendarStore.calendar.name);
  const inputRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  const handleBackClick = () => {
    uiStore.pageDialogInfo = 'calendarManage';
  };

  return (
    <>
      <EventBar title="캘린더 설정" leftSide={[{ action: 'back', onClick: handleBackClick }]} />
      <CalendarSettingViewContainer>
        {isEdit ? (
          <Input
            id="input"
            ref={inputRef}
            variant="filled"
            visibleClear
            limit={50}
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            onClear={() => {
              setValue('');
              document.getElementById('input').focus(); // inputRef로 focus 처리하는 방법을 모르겠음..
            }}
          />
        ) : (
          <CalendarName>
            {calendarStore.calendar.name}
            <IconButton onClick={() => setEdit(true)}>
              <Icon.EditLine color="#BDC1C6" width={20} height={20} />
            </IconButton>
          </CalendarName>
        )}
        <SettingItem>
          <Icon.CalendarDotFill color={calendarStore.calendar.color || ''} width={20} height={20} className="mr-8" />
          {ColorItem.find(color => color.value === calendarStore.calendar.color).label || ''}
        </SettingItem>
        <Divider />
        <SettingItem>
          <Icon.RenewLine width={20} height={20} className="mr-8" />
          캘린더 동기화
        </SettingItem>
        <SettingItem>
          <Icon.DeleteLine width={20} height={20} className="mr-8" />
          캘린더 삭제
        </SettingItem>
      </CalendarSettingViewContainer>
    </>
  );
};

export default CalendarSettingView;
